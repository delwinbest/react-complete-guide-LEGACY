import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

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