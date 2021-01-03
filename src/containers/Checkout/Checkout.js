import React, { Component } from 'react';
// import classes from './Checkout.module.scss';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: null
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }


    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    UNSAFE_componentWillMount () {
        //console.log('[Checkout.js] UNSAFE_componentWillMount')
        //console.log(this.props);
        //console.log(this.props.location.state.ingredients)
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            //['salad', '1']
            if ( param[0] === 'totalPrice') {
                this.setState({totalPrice: param[1] })
            } else {
                ingredients[param[0]] = +param[1];
            }
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
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>)} />
            </div>
        )
    }
}

export default Checkout;