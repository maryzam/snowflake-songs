import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './style/social-share.css';
import './style/layout.css';
import './style/navigation.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

class App extends Component {
  render() {
    return (
      <div className="flex-wrapper">

        <Header/>

        <Main/>

        <Footer/>

      </div>
    );
  }
}

export default App;
