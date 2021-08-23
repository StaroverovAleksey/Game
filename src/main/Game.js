const MapModel = require('../models/Map.model');

class Game {
    constructor() {
        this.start = false;
        this._users = {};
        this._chars = {};
        this._maps = {};

        this.mapSize = {x: 0, y: 0};
        this.mapCells = {};

        this._initialMap().then(() => {
            this.start = true;
        });
    }

    _initialMap = async () => {
        for await (const map of MapModel.find().populate('cells.$*.terrains')) {
            this._maps[map.id] = map;
        }
    }

    addMap = () => {
        /***Заглушка на будущее*/
    }

    removeMap = () => {
        /***Заглушка на будущее*/
    }

    addUser = ({user, socketId}) => {
        this._users[socketId] = user;
    }

    removeUser = (socketId) => {
        delete this._users[socketId];
    };

    checkUserLogged = (userId) => {
        const entries = Object.entries(this._users);
        const matchId = entries.findIndex(([key, {_id}]) => _id.toString() === userId.toString());
        return matchId > -1 ? entries[matchId][0] : false;
    };

    addChar = ({char, socketId}) => {
        this._chars[socketId] = char;
    }

    removeChar = (socketId) => {
        delete this._chars[socketId];
    }

    /*getCharsExceptSelf = (id) => {
        const copyChars = JSON.parse(JSON.stringify(this.chars));
        delete copyChars[id];
        return copyChars;
    }

    setUser = async (userId, socketId) => {
        for (let key in this.chars) {
            if (key === socketId || this.chars[key].userId === userId) {
                this.removeChar(key);
                return key;
            }
        }
        this.chars[socketId] = {userId};
    }

    setChar = async (charId, socketId) => {
        const char = await new Char();
        await char.initial(charId);
        console.log(this.chars);
        console.log(char);
        for (let key in this.chars) {
            if (key === socketId || this.chars[key].name === char.name) {
                this.removeChar(key);
                return key;
            }
        }
        this.chars[socketId] = char;
        return char;
    }

    removeChar = (id) => {
        delete this.chars[id];
    }*/
}

module.exports = new Game();
