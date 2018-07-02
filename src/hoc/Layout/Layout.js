import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigations/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigations/SideDrawer/SideDrawer';

class  Layout extends Component{
    state = {
        showSideDrawer: false
    }
    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer:false});
    }
    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
              return { showSideDrawer: !prevState.showSideDrawer}
            });
    }
    render () {
        return (
            <Aux>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main> 
            </Aux>
        )
    }
}
export default Layout;