import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuidControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_COST = {
    meat: 0.5,
    salad: 0.4,
    bacon: 0.7,
    cheese: 0.3
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading:false,
        error:false
    }

    updatePurchasbleState = (ingredients) => {
        const sum = Object.keys(ingredients).map(
                        (igKey) => {
                            return ingredients[igKey];
                        }
                    )
                    .reduce((sum, el) => {
                        return sum + el;
                    },0)
        this.setState({
            purchasable: sum > 0
        })
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing:false
        })
    }
    
    purchaseContinuedHandler = () => {
       this.setState({loading:true});
       const order = {
           ingredients: this.state.ingredients,
           price: this.state.totalPrice,
           customer: {
               name: 'Mahendra',
               email:'test@test.com'
           },
           deliveryMethod: 'fastest'
       }
       axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading:false, purchasing: false})
            })
            .catch(err => {
                this.setState({loading:false, purchasing: false})
            })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount;
        const updatedPrice = this.state.totalPrice + INGREDIENT_COST[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice:updatedPrice
        })
        this.updatePurchasbleState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount;
        const updatedPrice = this.state.totalPrice - INGREDIENT_COST[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice:updatedPrice
        })
        this.updatePurchasbleState(updatedIngredients);
    }
    componentDidMount(){
        axios.get('/ingredients.json')
        .then( response => {
            this.setState({ingredients: response.data})
        })
        .catch(error => {
            this.setState({error:true});
        })
    }
    render() { 
        const disableInfo = {
            ...this.state.ingredients
        }
        for( let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        
        let burger = this.state.error? <p>Ingredient Can't be loaded</p> : <Spinner/>;
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuidControls 
                    price = {this.state.totalPrice}
                    disabled = {disableInfo}
                    ordered={this.purchaseHandler}
                    purchasable = {this.state.purchasable}
                    ingredientRemove = { this.removeIngredientHandler} 
                    ingredientAdd = {this.addIngredientHandler}
                    />
                </Aux>    
            )
            orderSummary = <OrderSummary 
                            price={this.state.totalPrice}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinuedHandler}
                            ingredients={this.state.ingredients}
                            />;
        }
                                
        if(this.state.loading) {
            orderSummary = <Spinner/>
        }
        return ( 
            <Aux>  
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal> 
                {burger}
               
            </Aux>    
        );
    }
}
 
export default withErrorHandler(BurgerBuilder,axios);