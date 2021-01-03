import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.scss';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: 'Delwin Best',
        address: {
            street: 'P. Minor',
            zipCode: '140-0002',
            country: 'Japan'
        },
        email: 'test@test.com', 
        loading: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        //alert('You Continue!');
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: this.state.name,
                address: {
                    street: 'P. Minor',
                    zipCode: '140-0002',
                    country: 'Japan'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'Express'
        }
        axios.post('/orders.json', order)
            .then(respone => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    }
    componentDidMount () {
        console.log('[ContactData.js] componentDidMount')
        console.log(this.props);
    }

    render () {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
                <Input inputtype="input" type="email" name="email" placeholder="Your Email" />
                <Input inputtype="input" type="text" name="street" placeholder="Street " />
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code " />
            <Button 
                btnType="Success"
                clicked={this.orderHandler}>CONTINUE</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Information</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;