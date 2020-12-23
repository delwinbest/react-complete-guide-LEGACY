import React, { useEffect } from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
  // useEffect(() => {
  //   console.log('[Cockpit.js] useEffect')
  //   // HTTP Request if needed
  //   setTimeout(() => {
  //     alert ('Saved Data to Cloud')
  //   }, 1000);
  // }, [props.persons]); //Runs on props.persons change

  // useEffect(() => {
  //   console.log('[Cockpit.js] useEffect')
  //   // HTTP Request if needed
  //   setTimeout(() => {
  //     alert ('Saved Data to Cloud')
  //   }, 1000);
  // }, []); //Runs on initial render

  useEffect(() => {
    console.log('[Cockpit.js] useEffect')
    // HTTP Request if needed
    setTimeout(() => {
      alert ('Saved Data to Cloud')
    }, 1000);
    return () => {
      console.log('[Cockpit.js] cleanup work with useEffect')
    };
  }, []); //Runs on initial render

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect')
    return () => {
      console.log('[Cockpit.js] cleanup work with 2nd useEffect')
    };
  });

  const assignedClasses = [];
  let btnClasses = [];

  if (props.showPersons) {
      btnClasses = classes.Red;
  }
  
  if (props.personsLength<= 2) {
    assignedClasses.push(classes.red);
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold);
  }
  
  return (
      <div className={classes.Cockpit}>
          <h1>{props.title}</h1>
          <p className={assignedClasses.join(' ')}>This is really working!</p>
          <button 
              className={btnClasses} 
              onClick={props.clicked}>
              Toggle Persons</button>
      </div>
  );
};

export default React.memo(cockpit);