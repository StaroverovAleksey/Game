const CharModel = require('../models/Char.model');

module.exports = class Char {
    constructor() {
        this.busy = false;
    }

    initial = async (id) => {
        const char = await CharModel.findById(id);
        Object.keys(char['_doc']).forEach((key) => {
            this[key] = char[key];
        })
    }

    turn = (direction) => {
        if (this.busy) {
            return 'busy';
        }
        if (this.direction !== direction) {
            this.direction = direction;
            return true;
        } else {
            return false;
        }
    }

    step = (direction, mapCells) => {
        if (this.busy) {
            return 'busy';
        }
        let newLocation;
        switch (direction) {
            case 'up':newLocation = {x: this.location.x, y: this.location.y - 1}; break;
            case 'down': newLocation = {x: this.location.x, y: this.location.y + 1}; break;
            case 'right': newLocation = {x: this.location.x + 1, y: this.location.y}; break;
            case 'left': newLocation = {x: this.location.x - 1, y: this.location.y}; break;
        }

        if (mapCells.has(`${newLocation.x}_${newLocation.y}`)) {
            const cell = mapCells.get(`${newLocation.x}_${newLocation.y}`);
            let pass = true;
            cell.terrains.forEach(({passability}) => {
                if (!passability) {
                    pass = passability;
                    return;
                }
            })
            if (!pass) {
                return false;
            }
            this.location = newLocation;
            this.busy = true;
            setTimeout(() => this.busy = false, 1000);
            return newLocation;
        } else {
            return false;
        }
    }
}
