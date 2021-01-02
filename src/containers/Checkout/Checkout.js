import React, { Component } from 'react';
// import classes from './Checkout.module.scss';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {}
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }


    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    componentDidMount () {
        console.log('[Checkout.js] componentDidMount')
        //console.log(this.props);
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
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
        )
    }
}

export default Checkout;