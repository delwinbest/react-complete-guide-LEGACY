import React from 'react';
import classes from './MenuDrawer.module.scss';

const drawer = ( props ) => (
    <div className={classes.MenuDrawer} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawer;
