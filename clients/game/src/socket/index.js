import React from 'react';
import config from "../../config.json";
import {io} from "socket.io-client";
import auth from "./auth";
import user from "./user";
import {connect} from "react-redux";
import {setCells, setCharacter, setError} from "../redux/actions";

class Socket  {
    constructor() {
        this.address = process.env.NODE_ENV === 'development' ? config.develop.serverAddress : config.production.serverAddress;
        this.socket = io(this.address);
        this.socket.on('hello', () => {
            
        })
    }

    send = (endPoint, body) => {
        this.socket.emit(endPoint, body);
    }


}

Object.assign(
    Socket.prototype,
    auth,
    user
);

export default new Socket();
