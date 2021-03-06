import axios from "axios";
import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes'
import { REGISTRATION_URL, SIGN_IN_URL } from "./authURL";

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = REGISTRATION_URL  

        if(isLogin){
             url = SIGN_IN_URL 
        }
        
        const response = await axios.post(url, authData)
        const data = response.data;

        const expirationData = new Date( new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationData', expirationData)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    }
}

export function autoLogout(time) {
    return async dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)

    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationData')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        } else {
            const expirationData = new Date(localStorage.getItem('expirationData'))
            if(expirationData <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationData.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}