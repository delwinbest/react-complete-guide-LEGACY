import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if ( props.open ) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.toggleclosed}/>
            <div className={attachedClasses.join(' ')} onClick={props.toggleclosed}>
                <Logo height='11%'/>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;