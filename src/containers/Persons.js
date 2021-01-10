import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {
    personAddedHandler = () => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: 'Max',
            age: Math.floor( Math.random() * 40 )
        }
        // this.setState( ( prevState ) => {
        //     return { persons: prevState.persons.concat(newPerson)}
        // } );
        this.props.onAddUser(newPerson);
    }

    personDeletedHandler = (personId) => {
        this.props.onDeleteUser(personId);
        // this.setState( ( prevState ) => {
        //     return { persons: prevState.persons.filter(person => person.id !== personId)}
        // } );

    }

    render () {
        return (
            <div>
                <AddPerson personAdded={this.personAddedHandler} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.personDeletedHandler(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        persons: state.persons
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddUser: (person) => dispatch({type: actionTypes.ADD_USER, person: person}),
        onDeleteUser: (id) => dispatch({type: actionTypes.DELETE_USER, personId: id})
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Persons);