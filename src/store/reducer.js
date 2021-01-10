import * as actionTypes from './actions';

const initialState = {
    ingredients: null,
    totalPrice: 4
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INGREDIENTS:
            console.log(action);
            return {
                ...state,
                ingredients: {...action.ingredients}
            };
        default:
            return state;
    }
};

export default reducer;
