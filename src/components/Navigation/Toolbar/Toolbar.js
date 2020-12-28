import React from 'react';
import classes from './Toolbar.module.scss';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = ( props ) => {
   return (
    <header className={classes.Toolbar}>
            <div>MENU</div>
            <Logo height='80%'/>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
   )
};

export default toolbar;