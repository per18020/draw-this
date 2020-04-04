import React, { useEffect } from 'react';
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import { setSocket } from '../redux/actions';
import { isDevelopment } from '../common/environment';

import './App.scss';

import Home from '../pages/home/Home';
import Pregame from '../pages/pregame/Pregame';
import Game from '../pages/game/Game';
import Scoring from '../pages/game/Scoring';
import Wait from '../pages/game/Wait';
import Ranking from '../pages/postgame/Ranking';
import DrawYourself from '../pages/drawYourself/DrawYourself';
import TimeoutContainer from '../pages/timeout/TimeoutContainer';
import Timeout from '../pages/timeout/Timeout';

function App({ setSocket }) {
  // Init
  useEffect(() => {
    let socket;
    if (isDevelopment) {
      socket = socketIOClient()
    } else {
      socket = socketIOClient({ transports: ['websocket'] })
    }
    setSocket(socket);
  }, [])

  return (
    <Router>
      <TimeoutContainer />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/drawYourself" component={DrawYourself} />
        <Route path="/pregame" component={Pregame} />
        <Route path="/game" component={Game} />
        <Route path="/wait" component={Wait} />
        <Route path="/scoring" component={Scoring} />
        <Route path="/ranking" component={Ranking} />
        <Route path="/timeout" component={Timeout} />
      </Switch>
    </Router>
  );
}

export default connect(null, { setSocket })(App);
