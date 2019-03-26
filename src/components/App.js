import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AllCharacters from './characters/AllCharacters'
import Character from './characters/Character'

class App extends Component {
  render() {
    return (
        <Router>
            <Route path="/" exact component={AllCharacters} />
            <Route path='/:id' exact component={Character} />
        </Router>
    );
  }
}

export default App;
