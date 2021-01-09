const initialState = {
    counter: 0,
    results: []
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            const newState = Object.assign({}, state);
            newState.counter = state.counter + 1
            return newState;
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - 1
            };
        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.value
            };
        case 'SUBTRACT':
            return {
                ...state,
                counter: state.counter - action.value
            };
        case 'STORE_RESULT':
            return {
                ...state,
                results: state.results.concat({id: new Date().valueOf(), value: state.counter})
            };
        case 'DELETE_RESULT':
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