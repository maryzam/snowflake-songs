import React, { Component } from 'react';
import { Switch, Route} from "react-router-dom";

import AllSongs from "./components/AllSongs";
import Song from "./components/Song";
import About from "./components/About";

import './style/social-share.css';
import './style/layout.css';
import './style/snowflake.css';
import './style/header.css';
import './style/footer.css';
import './style/single-song.css';
import './style/about.css';

const App = () => (
    <Switch>
      <Route exact path='/' component={ AllSongs }/>
      <Route exact path='/about' component={ About }/>
      <Route path='/song/:id' component={ Song }/>
    </Switch>
);

export default App;