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
        return data;
    }

    removeChar = (id) => {
        delete this.chars[id];
    }

    turn = (direction, socket) => {
        const {id} = socket;
        const char = this.chars[id];
        if (char.busy) {
            return 'busy';
        }
        if (char.direction !== direction) {
            char.direction = direction;
            return true;
        } else {
            return false;
        }
    }

    step = (direction, socket) => {
        const {id} = socket;
        const char = this.chars[id];
        if (char.busy) {
            return 'busy';
        }
        let newLocation;
        switch (direction) {
            case 'up':newLocation = {x: char.location.x, y: char.location.y - 1}; break;
            case 'down': newLocation = {x: char.location.x, y: char.location.y + 1}; break;
            case 'right': newLocation = {x: char.location.x + 1, y: char.location.y}; break;
            case 'left': newLocation = {x: char.location.x - 1, y: char.location.y}; break;
        }
        if (this.mapCells.has(`${newLocation.x}_${newLocation.y}`)) {
            char.location = newLocation;
            char.busy = true;
            setTimeout(() => char.busy = false, 1000);
            return newLocation;
        } else {
            return false;
        }
    }
}

module.exports = new Game();
