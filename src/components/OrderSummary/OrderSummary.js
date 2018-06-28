import React from 'react';
import Aux from '../../hoc/Aux'

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
            <p> Continue to checkout ? </p>    
        </Aux>    
    )
}
 
export default orderSummary;