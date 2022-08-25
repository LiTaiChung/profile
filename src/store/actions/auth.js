import {
    AUTH_REFRESH_TOKEN,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_CHECK,
    AUTH_USER,
} from 'store/action-types/auth';

export function authCheck() {
    return {
        type: AUTH_CHECK
    }
}

export function authLogin(payload) {
    return {
        type: AUTH_LOGIN,
        payload
    }
}

export function authLogout() {
    return {
        type: AUTH_LOGOUT
    }
}

export function authRefreshToken(payload) {
    return {
        type: AUTH_REFRESH_TOKEN,
        payload
    }
}

export function authUser(payload) {
    return {
        type: AUTH_USER,
        payload
    }
}