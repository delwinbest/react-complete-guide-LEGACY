import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-orders';

export function* initIngredientSaga(action) {
    try {
        const response = yield axios.get( 'https://react-my-burger-a83db-default-rtdb.firebaseio.com/ingredients.json' )
        yield put(actions.setIngredients(response.data));
    } catch {
        yield put(actions.fetchIngredientsFailed());
    }
}