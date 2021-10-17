import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  c='Aman';//class variable or instance variables
  render() {
    return (
      <div>
        {/* Class based component {this.c} */}
        <NavBar/>
        <News pageSize={6}/>
      </div>
    )
  }
}

