import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';
import * as credentials from '../../credentials';

export function* logoutSaga(action) { // * create generator which can be paused during execution
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationTime');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(logout()); 
    //     }, expirationTime*1000); //ms to s
    // }
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    // return dispatch => {
    //     dispatch(authStart());
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     }
    //     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    //     if (!isSignup) {
    //         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    //     }
    //     axios.post(url+credentials.FIREBASE_WEB_KEY, authData)
    //         .then(response => {
    //             const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    //             localStorage.setItem('token', response.data.idToken )
    //             localStorage.setItem('expirationTime', expirationDate )
    //             localStorage.setItem('userId', response.data.localId )
    //             dispatch(authSuccess(response.data.idToken, response.data.localId, response));
    //             dispatch(checkAuthTimeout(response.data.expiresIn));
    //         })
    //         .catch(error => {
    //             dispatch(authFail(error.response.data.error));
    //         })
    // }
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    }
    try {
        const response = yield axios.post(url+credentials.FIREBASE_WEB_KEY, authData);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken );
        yield localStorage.setItem('expirationTime', expirationDate );
        yield localStorage.setItem('userId', response.data.localId );

        yield put(actions.authSuccess(response.data.idToken, response.data.localId, response));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         dispatch(logout());
    //     } else {
    //         const expirationTime = new Date(localStorage.getItem('expirationTime'));

    //         if (expirationTime <= new Date()) {
    //             dispatch(logout());
    //         } else {
    //             const userId = localStorage.getItem('userId');
    //             dispatch(authSuccess(token, userId))
    //             dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime())/1000))
    //         }
    //     }
    // }
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));

        if (expirationTime <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId))
            yield put(actions.checkAuthTimeout((expirationTime.getTime() - new Date().getTime())/1000))
        }
    }
}