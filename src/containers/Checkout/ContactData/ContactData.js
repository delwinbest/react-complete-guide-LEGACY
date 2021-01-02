import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.scss';

class ContactData extends Component {
    state = {
        name: 'Delwin Best',
        address: {
            street: 'P. Minor',
            zipCode: '140-0002',
            country: 'Japan'
        },
        email: 'test@test.com'
    }

    componentDidMount () {
        console.log('[ContactData.js] componentDidMount')
    }

    render () {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Information</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your Email" />
                    <input type="text" name="street" placeholder="Street " />
                    <input type="text" name="postal" placeholder="Postal Code " />
                    <Button 
                        btnType="Success"
                        clicked={this.props.state}>CONTINUE</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;