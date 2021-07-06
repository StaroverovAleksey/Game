const Map = require('../models/Map');
const Char = require("./Char");

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
    }
}

module.exports = new Game();
