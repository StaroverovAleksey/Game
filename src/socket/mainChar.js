const game = require('../main/Game');

module.exports = {
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
