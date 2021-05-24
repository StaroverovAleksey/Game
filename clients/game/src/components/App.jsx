import React from 'react';
import { connect } from 'react-redux';
import Login from './pages/Login';
import Registration from './pages/Registration';
import {
    ROUT_ERROR,
    ROUT_LOGIN,
    ROUT_REGISTRATION
} from '../tools/routing';
import Game from './pages/game/Game';
import Error from "./pages/Error";
import "../i18n/index";


class App extends React.Component {
  render() {
    const { routing, error } = this.props;
    switch (routing) {
        case ROUT_LOGIN: return <Login/>;
        case ROUT_REGISTRATION: return <Registration/>;
        case ROUT_ERROR: return <Error error={error}/>;
        default: return <Game/>;
    }
  }
}

export default connect(
  (mapStateToProps) => ({
      routing: mapStateToProps.setting.routing,
      error: mapStateToProps.setting.error
  }),
  undefined,
)(App);
