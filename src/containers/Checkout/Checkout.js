import React, { Component } from 'react';
// import classes from './Checkout.module.scss';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {}
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }


    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/collect-data');
    }

    componentDidMount () {
        console.log(this.props);
        //console.log(this.props.location.state.ingredients)
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            //['salad', '1']
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }
    
    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancelled={this.checkoutCancelledHandler} 
                    checkoutContinued={this.checkoutContinueHandler}/>
            </div>
        )
    }
}

export default Checkout;