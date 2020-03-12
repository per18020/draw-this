import React from 'react';
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";

import './App.scss';

import Home from '../pages/home/Home';
import Pregame from '../pages/pregame/Pregame';
import Game from '../pages/game/Game';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/pregame" component={Pregame} />
        <Route path="/game" component={Game} />
      </Switch>
    </Router>
  );
}

export default App;
