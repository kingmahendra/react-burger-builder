import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuidControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const INGREDIENT_COST = {
    meat: 0.5,
    salad: 0.4,
    bacon: 0.7,
    cheese: 0.3
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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
        alert('You continued the purchase');
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
    render() { 
        const disableInfo = {
            ...this.state.ingredients
        }
        for( let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return ( 
            <Aux>  
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinuedHandler}
                        ingredients={this.state.ingredients}
                        />
                </Modal> 
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
        );
    }
}
 
export default BurgerBuilder;