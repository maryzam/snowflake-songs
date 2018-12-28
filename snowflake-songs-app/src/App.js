import React, { Component } from 'react';
import './App.css';
import './style/social-share.css';
import './style/layout.css';
import './style/snowflake.css';
import './style/header.css';
import './style/single-song.css';

import Header from "./components/Header/Header";
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
