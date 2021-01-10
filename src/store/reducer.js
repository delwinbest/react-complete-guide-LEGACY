import * as actionTypes from './actions';

const initialState = {
    ingredients: null,
    totalPrice: 4
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INGREDIENTS:
            console.log(state);
            return {
                ...state,
                ingredients: {...action.ingredients}
            };
        case actionTypes.SET_TOTAL_PRICE:
            console.log(state);
            return {
                ingredients: {...state.ingredients},
                totalPrice: action.newPrice
            };
        default:
            return state;
    }
};

export default reducer;
