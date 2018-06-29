import React from 'react';
import classes from './ToggleDrawer.css';

const toggleDrawer = (props) => {
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}> 
           <div></div>
           <div></div>
           <div></div>
        </div>
    )
}
 
export default toggleDrawer;