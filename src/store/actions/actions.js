export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';

export const increment = () => {
    return {
        type: INCREMENT
    };
};

export const decrement = () => {
    return {
        type: DECREMENT
    };
};

export const add = (value) => {
    return {
        type: ADD,
        val: value
    };
};

export const subtract = (value) => {
    return {
        type: SUBTRACT,
        val: value
    };
};


////////////////////////////////////////////////////////////////

export const saveResult = (res) => { //synchronous function
    return {
        type: STORE_RESULT,
        result: res
    };
}

export const storeResult = (value) => { //async function dispatch sync function
    return dispatch => {
        setTimeout(()=>{
            dispatch(saveResult(value));
        }, 2000);
    }
};

////////////////////////////////////////////////////////////////

export const deleteResult = (value) => {
    return {
        type: DELETE_RESULT,
        resultElId: value
    };
};