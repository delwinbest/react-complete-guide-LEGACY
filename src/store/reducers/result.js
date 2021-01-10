import * as actionTypes from '../actions';

const initialState = {
    results: []
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id: new Date().valueOf(), value: action.result})
            };
        case actionTypes.DELETE_RESULT:
            //const id = 2;
            //state.results.splice(id, 1); //mutates array
            //const newArray = [...state.results]
            //newArray.results.splice(id, 1);
            const newArray = state.results.filter((result) => result.id !== action.resultElementId ? true : false); //returns a new array
            return {
                ...state,
                results: newArray
            };
        default:
            return state;
    }    
};

export default reducer;