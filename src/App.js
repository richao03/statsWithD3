import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Graph1 from './topBar/topBar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to Reacto World</h1>
        </header>
        <p className="App-intro">

          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <Graph1/>
      </div>
    );
  }
}

export default App;
