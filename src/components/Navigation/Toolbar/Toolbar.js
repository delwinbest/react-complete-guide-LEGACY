import React from 'react';
import classes from './Toolbar.module.scss';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuDrawer from '../SideDrawer/MenuDrawer/MenuDrawer';

const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <MenuDrawer clicked={props.toggleclosed}/>
        <Logo height='80%'/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;