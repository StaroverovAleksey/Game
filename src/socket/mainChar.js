const game = require('../main/Game');
const User = require('../models/User');
const Map = require('../models/Map');
const Character = require('../models/Character');
const {START_LOCATION} = require("../utils/constants");

module.exports = {
    async create ({login, sex, bodyColor, hairType, hairColor}, socket) {
        const {id} = socket;
        const {userId} = game.chars[id];
        const startMap = await Map.findOne();
        const character = new Character({
            name: login,
            appearance: {sex, bodyColor, hairType, hairColor},
            map: startMap.id,
            direction: 'front',
            location: START_LOCATION});
        await character.save();

        const {characters} = await User.findById(userId, 'characters');
        characters.push(character);
        await User.findByIdAndUpdate(userId, {characters}).exec();
    },

    turn (direction, socket) {
        const {id} = socket;
        const result = game.chars[id].turn(direction);
        if (result === 'busy') {
            socket.emit('SETTINGS_SET_ERROR', {
                msg: "tooFast",
                address: "MAIN_CHAR",
            });
            return;
        }
        if (result) {
            socket.broadcast.emit('CHARS_TURN', {id, direction });
            socket.emit('MAIN_CHAR_TURN', direction);
        } else {
            socket.emit('SETTINGS_SET_ERROR', {
                msg: "alreadyTurned",
                address: "MAIN_CHAR",
            });
        }
    },

    step (direction, socket) {
        const {id} = socket;
        const result = game.chars[id].step(direction, game.mapCells);
        if (result === 'busy') {
            socket.emit('SETTINGS_SET_ERROR', {
                msg: "tooFast",
                address: "MAIN_CHAR",
            });
            return;
        }
        if (result) {
            socket.emit('MAIN_CHAR_STEP', result);
            socket.broadcast.emit('CHARS_STEP', {id, location: result });
        } else {
            socket.emit('SETTINGS_SET_ERROR', {
                msg: "doNotPass",
                address: "MAIN_CHAR",
            });
        }
    }
} ;
