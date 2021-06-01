const Map = require('../models/Map');

class Game {
    constructor() {
        this.chars = {};
        this.mapSize = {x: 0, y: 0};
        this.mapCells = {};

        this._initialMap();
    }

    _initialMap = async () => {
        const map = await Map.findOne().populate('cells.$*.terrains');
        this.mapSize = map.size;
        this.mapCells = map.cells;
    }

    getCharsExceptSelf = (id) => {
        const copyChars = JSON.parse(JSON.stringify(this.chars));
        delete copyChars[id];
        return copyChars;
    }

    setChar = (char, socket) => {
        const {id} = socket;
        for (let key in this.chars) {
            if (key === id || this.chars[key].name === char.name) {
                this.removeChar(key);
            }
        }
        this.chars[id] = char;
        const data = {};
        data[id] = char;
        socket.broadcast.emit('CHARS_ADD', data);
    }

    removeChar = (id) => {
        delete this.chars[id];
        process.io.emit('CHARS_REMOVE', id);
    }
}

module.exports = new Game();
