import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummury/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            meat:1,
            salad:1,
            cheese:1,
            bacan:1
        }
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients ={};
        for(let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients:ingredients});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    chekoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() { 
        return ( 
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled ={this.checkoutCancelledHandler}
                    checkoutContinued = {this.chekoutContinuedHandler}/>
            </div>    
         )
    }
}
 
export default Checkout;