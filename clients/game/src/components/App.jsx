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
import config from "../../config.json";
import {io} from "socket.io-client";


class App extends React.Component {

    componentDidMount() {
        this.address = process.env.NODE_ENV === 'development' ? config.develop.serverAddress : config.production.serverAddress;
        this.socket = io(this.address);
        this.socket.onAny((event, data) => {
            console.log(event, data);
            this.props.dispatch({ type: event, payload: data });
        });
        this.props.dispatch({ type: 'SETTINGS_SET_SOCKET', payload: this.socket });
    }

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
      routing: mapStateToProps.settings.routing,
      error: mapStateToProps.settings.error
  }),
)(App);
