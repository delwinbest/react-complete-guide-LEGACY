import React, { Component } from 'react';
// import classes from './Checkout.module.scss';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1
        }
    }

    componentDidMount () {
        console.log(this.props);
    }
    
    render () {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}/>
            </div>
        )
    }
}

export default Checkout;