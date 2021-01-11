import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        // totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount = () => {
        //console.log(this.props);
        axios.get('https://react-my-burger-93be9-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                //this.setState({ingredients: response.data});
                //console.log('[BurgerBuilder.js] Ingredients Retrieved');
                this.props.onSetIngredients(response.data);
                this.updatePurchaseState(response.data);
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.props.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.props.totalPrice;
        const newPrice = oldPrice + priceAddition;
        // this.setState({
        //     ingredients: updatedIngredients,
        //     totalPrice: newPrice
        // });
        this.props.onSetIngredients(updatedIngredients);
        this.props.onSetPrice(newPrice);
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.props.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.props.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        this.setState({ purchaseable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchasedCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchasedContinueHandler = () => {  
        this.props.history.push({pathname: '/checkout'}); 
    }

    render () {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for ( let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key] <= 0 // Test for 0
            // {salad: true, meat: false}
        };
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients Cannot be Loaded...</p> : <Spinner /> 
        
        if (this.props.ingredients) {
            orderSummary = <OrderSummary 
                purchaseCancelled={this.purchasedCancelHandler}
                purchaseContinued={this.purchasedContinueHandler}/>
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
        }

        if (this.state.loading) {
            orderSummary=<Spinner />
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchasedCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetIngredients: (ingredients) => dispatch({type: actionTypes.SET_INGREDIENTS, ingredients: ingredients}),
        onSetPrice: (price) => dispatch({type: actionTypes.SET_TOTAL_PRICE, newPrice: price})
    };
};

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), axios);