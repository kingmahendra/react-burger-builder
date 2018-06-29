import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleDrawer from '../SideDrawer/ToggleDrawer/ToggleDrawer';
const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <ToggleDrawer clicked={props.toggleSideDrawer}/>
            <div className={classes.Logo}> 
             <Logo/>
          </div>
            <nav className={classes.DesktopOnly}> 
                <NavigationItems/>
            </nav>
        </header>
    );
}
 
export default toolbar;