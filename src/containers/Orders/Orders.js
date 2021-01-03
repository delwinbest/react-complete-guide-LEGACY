import React, { Component } from 'react';
import Order from '../../components/Order/Order';
// import classes from './Orders.modules.scss';

class Orders extends Component {
    render() {
        return(
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}

export default Orders;