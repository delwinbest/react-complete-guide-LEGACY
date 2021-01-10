import * as actionTypes from './actions';


const initialState = {
    persons: []
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER:
            return {
                ...state,
                persons: [
                    ...state.persons,
                    action.person
                ]
            };
        case actionTypes.DELETE_USER:
            // return { persons: prevState.persons.filter(person => person.id !== personId)}
            const prevState = state;
            return { persons: prevState.persons.filter(person => person.id !== action.personId)}
        default:
            return state;
    }
};

export default reducer;
