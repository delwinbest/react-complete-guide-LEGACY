import React, { Component } from 'react';

import Persons from './containers/Persons';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ol>
          <li><strike>Turn this app into one which does NOT use local state (in components) but instead uses Redux</strike></li>
        </ol>
        <Persons />
      </div>
    );
  }
}

export default App;
