import React from 'react';

import { Switch, Route} from "react-router-dom";

import Songs from "./Songs";
import Song from "./Song";
import About from "./About";

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Songs}/>
      <Route exact path='/about' component={About}/>
      <Route path='/song/:number' component={Song}/>
    </Switch>
  </main>
)

export default Main;
