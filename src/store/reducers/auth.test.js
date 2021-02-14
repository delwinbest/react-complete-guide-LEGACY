import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            response: null,
            loading: false,
            authRedirectPath: '/'
        });
    })


    it('should store the token on login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            response: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-userId',
            response: 'some-response'
        }
        )).toEqual({
            token: 'some-token',
            userId: 'some-userId',
            error: null,
            response: 'some-response',
            loading: false,
            authRedirectPath: '/'
        })
    })
})
