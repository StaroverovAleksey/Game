const game = require('../main/Game');
const UserModel = require('../models/User.model');
const MapModel = require('../models/Map.model');
const CharModel = require('../models/Char.model');
const {START_LOCATION} = require("../utils/constants");

module.exports = {
    async create ({login, sex, bodyColor, hairType, hairColor}, socket) {
        const checkNickname = await CharModel.findOne({name: login});
        if (checkNickname) {
            socket.emit('SETTINGS_SET_ERROR', {
                msg: "nameIsTaken",
                address: "MAIN_CHAR",
            });
            return;
        }
        const startMap = await MapModel.findOne();
        const character = new CharModel({
            name: login,
            appearance: {sex, bodyColor, hairType, hairColor},
            map: startMap.id,
            location: START_LOCATION});
        await character.save();


        const {id} = socket;
        const userId = game._users[id]._id;
        const {characters} = await UserModel.findById(userId, 'characters');
        characters.push(character);
        await UserModel.findByIdAndUpdate(userId, {characters});
        socket.emit('CHOICE_CHAR_LIST_ADD', {
            direction: character.direction,
            level: character.level,
            _id: character.id,
            name: character.name,
            appearance: character.appearance
        });
        socket.emit('SETTINGS_CHANGE_ROUTER', 'choiceChar');
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
