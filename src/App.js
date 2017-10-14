import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './graph/graph.css'
import Graph1 from './topBar/topBar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to Reacto World</h1>
        </header>
  
        <Graph1/>
      </div>
    );
  }
}

export default App;
