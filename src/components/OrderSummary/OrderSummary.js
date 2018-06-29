import React from 'react';
import Aux from '../../hoc/Aux'
import Button from '../UI/Button/Button';

const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients).map(
        (igKey) => {
            return (<li key={igKey}>
                        <span style={{textTransform:'Capitalize'}}> {igKey} </span> : { props.ingredients[igKey]} 
                   </li>)

        }
    )
    return (
        <Aux>
            <h2> Your order </h2>
            <p> A delicious burger with following ingredients: </p> 
            <ul>
                {ingredients}
            </ul>
            <p> <strong> Total Price : ${props.price.toFixed(2)}</strong></p>
            <p> Continue to checkout ? </p>  
            <Button clicked={props.purchaseCancelled} btnType="Danger"> CANCEL </Button> 
            <Button clicked={props.purchaseContinued} btnType="Success"> CONTINUE </Button>
        </Aux>    
    )
}
 
export default orderSummary;