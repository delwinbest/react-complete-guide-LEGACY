import * as actionTypes from './actionTypes';

////////////////////////////////////////////////////////////////

export const saveResult = (res) => { //synchronous function
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    };
}

export const storeResult = (value) => { //async function dispatch sync function
    return (dispatch, getState) => {
        setTimeout(()=>{
            const oldCounter = getState().ctr.counter
            console.log(oldCounter);
;            dispatch(saveResult(value));
        }, 2000);
    }
};

////////////////////////////////////////////////////////////////

export const deleteResult = (value) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: value
    };
};