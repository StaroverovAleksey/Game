import React from 'react';
import { connect } from 'react-redux';
import Login from './pages/Login';
import Registration from './pages/Registration';
import {
    ROUT_CHOICE_CHAR, ROUT_CREATE_CHAR,
    ROUT_ERROR,
    ROUT_LOGIN,
    ROUT_REGISTRATION
} from '../tools/routing';
import Game from './pages/game/Game';
import Error from "./pages/Error";
import "../i18n/index";
import config from "../../config.json";
import {io} from "socket.io-client";
import ChoiceChar from "./pages/ChoiceChar";
import CreateChar from "./pages/CreateChar";


class App extends React.Component {

    componentDidMount() {
        this.address = process.env.NODE_ENV === 'development' ? config.develop.serverAddress : config.production.serverAddress;
        this.socket = io(this.address);
        this.socket.onAny((event, data) => {
            console.log(event, data);
            this.props.dispatch({ type: event, payload: data });
        });
        this.props.dispatch({ type: 'SETTINGS_SET_SOCKET', payload: this.socket });
        window.document.addEventListener("keydown", this._onKeyDownHandler);



        /***Для автоматизации логина********   начало   */
        this.socket.emit('auth/authorization', {email: 'w@mail.ru', password: 'Cnfhjdthjd1988'});
        /**********************************    конец    */
    }

    /***Для автоматизации логина********   начало   */
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {routing} = this.props;
        if (prevProps.routing !== routing && routing === 'choiceChar') {
            this.socket.emit('auth/enterGame', {id: '6125139a7db66b3e1003e82c'});
        }
    }
    /**********************************    конец    */

    componentWillUnmount() {
        window.document.removeEventListener("keydown", this._onKeyDownHandler);
    }

    render() {
    const { routing, error } = this.props;
    switch (routing) {
        case ROUT_LOGIN: return <Login/>;
        case ROUT_CHOICE_CHAR: return <ChoiceChar/>;
        case ROUT_CREATE_CHAR: return <CreateChar/>;
        case ROUT_REGISTRATION: return <Registration/>;
        case ROUT_ERROR: return <Error error={error}/>;
        default: return <Game/>;
    }
  }

    _onKeyDownHandler = (event) => {
        const {dispatch} = this.props;
        switch (event.code) {
            case 'Escape': dispatch({type: 'MAIN_CHAR_CHANGE_TARGET', payload: undefined}); break;
            case 'Digit1': this.socket.emit('auth/debug', 'all'); break;
            case 'Digit2': this.socket.emit('auth/debug', 'maps'); break;
            case 'Digit3': this.socket.emit('auth/debug', 'users'); break;
            case 'Digit4': this.socket.emit('auth/debug', 'chars'); break;
        }
    }
}

export default connect(
  (mapStateToProps) => ({
      routing: mapStateToProps.settings.routing,
      error: mapStateToProps.settings.error
  }),
)(App);
