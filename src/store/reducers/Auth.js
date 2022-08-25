import Http from 'utils/Http';
import {
    AUTH_REFRESH_TOKEN,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_CHECK,
    AUTH_USER,
} from 'store/action-types/auth';

const user = {
    id: "",
    name: "",
    email: "",
};

const initialState = {
    isAuthenticated : false,
    user,
};

export default function AuthReducer(state = initialState, {type, payload = null}) {
    switch (type) {
        case AUTH_REFRESH_TOKEN:
            return refreshToken(state, payload);
        case AUTH_LOGIN:
            return login(state, payload);
        case AUTH_LOGOUT:
            return logout(state);
        case AUTH_CHECK:
            return checkAuth(state);
        case AUTH_USER:
            return authUser(state, payload);
    }
}

const login = (state, payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;

    localStorage.setItem('access_token', access_token);
    refresh_token ? localStorage.setItem('refresh_token', refresh_token) : localStorage.removeItem('refresh_token');
    
    Http.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

    return {
        ...state,
        isAuthenticated: true,
        homeNews: true,
    }
};

const refreshToken = (state, payload) => {
    const access_token = payload.access_token;
    const refresh_token = payload.refresh_token;

    localStorage.setItem('access_token', access_token);
    refresh_token ? localStorage.setItem('refresh_token', refresh_token) : localStorage.removeItem('refresh_token');
    
    Http.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

    return {
        ...state,
        isAuthenticated: true,
    }
};

const checkAuth = (state) => {
    state = Object.assign({}, state, {
        isAuthenticated : !!localStorage.getItem('access_token'),
    });

    if(state.isAuthenticated){
        Http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    }
    return state;
};

const logout = (state) => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    return {
        ...state,
        isAuthenticated: false,
        user,
        homeNews: false,
        expireHomeNews: null,
    }
};

const authUser = (state, user) => {
    return {
        ...state, user: user.data
    }
}

export const getAuth = state => state.auth.isAuthenticated;

