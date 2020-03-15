import React, { useEffect } from 'react';
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import { setSocket } from '../redux/actions';

import './App.scss';

import Home from '../pages/home/Home';
import Pregame from '../pages/pregame/Pregame';
import Game from '../pages/game/Game';
import DrawYourself from '../pages/drawYourself/DrawYourself';

function App({ setSocket }) {
  // Init
  useEffect(() => {
    setSocket(socketIOClient());
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/drawYourself" component={DrawYourself} />
        <Route path="/pregame" component={Pregame} />
        <Route path="/game" component={Game} />
      </Switch>
    </Router>
  );
}

export default connect(null, { setSocket })(App);
