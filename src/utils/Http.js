import axios from 'axios';
import store from 'store';
import { authLogout } from 'store/actions/auth';
import { refreshToken } from 'services/authService';

// XMLHttpRequest
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// CSRF
const csrfToken = document.head.querySelector('meta[name="X-CSRF-TOKEN"]');
if (csrfToken && csrfToken !== '') {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.content;
}

// Access Token
const access_token = localStorage.getItem('access_token');
if (access_token && access_token !== '') {
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
}

// Refresh Token
// const refresh_token = localStorage.getItem('refresh_token');

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(pros => {
        if (error) {
            pros.reject(error);
        } else {
            pros.resolve(token);
        }
    })

    failedQueue = [];
}


axios.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({resolve, reject})
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axios(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                })
            }
    
            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise(function (resolve, reject) {
                store.dispatch(refreshToken())
                .then(res => {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.access_token;
                    originalRequest.headers['Authorization'] = `Bearer ${res.access_token}`;
                    processQueue(null, res.access_token);
                    resolve(axios(originalRequest));
                })
                .catch(err => {
                    store.dispatch(authLogout());
                    processQueue(err, null);
                })
                .finally(() => { isRefreshing = false })
            })
        }
    
        return Promise.reject(error);
});
  

export default axios;