import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Meat' , type: 'meat'},
    { label: 'Salad' , type: 'salad'},
    { label: 'Cheese' , type: 'cheese'},
    { label: 'Bacaon' , type: 'bacon'}
]
const buildControls = (props) => (
    <div className={classes.BuildControls}> 
     <p> Current Price : <strong> $ {props.price.toFixed(2)}</strong> </p>
       {controls.map(ctrl => <BuildControl 
       key={ctrl.label} 
       label={ctrl.label}
       disabled = { props.disabled[ctrl.type]}
       removed={() => props.ingredientRemove(ctrl.type)}
       added={() => props.ingredientAdd(ctrl.type)}
       />)}
       <button 
       className={classes.OrderButton}
       onClick={props.ordered} 
       disabled={!props.purchasable}>
            ORDER NOW 
       </button>
    </div>
);
 
export default buildControls;