import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

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
  const toggleButtonRef = useRef(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect')
    // HTTP Request if needed
    // setTimeout(() => {
    //   //alert ('Saved Data to Cloud')
    // }, 1000);
    toggleButtonRef.current.click();
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
              ref={toggleButtonRef}
              className={btnClasses} 
              onClick={props.clicked}>
              Toggle Persons</button>
           <button onClick={authContext.login}>Log In</button>
      </div>
  );
};

export default React.memo(cockpit);