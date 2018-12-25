import React, { Component } from 'react';
import './App.css';
import './style/social-share.css';
import './style/layout.css';
import './style/navigation.css';
import './style/snowflake.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

const App = () => (
      <div className="flex-wrapper">

        <Header/>
        <Main/>
        <Footer/>

      </div>
    );

export default App;
