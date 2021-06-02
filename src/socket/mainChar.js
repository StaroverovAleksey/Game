const game = require('../main/game');

module.exports = {
    turn (direction, socket) {
        const {id} = socket;
        const result = game.turn(direction, socket);
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
        const result = game.step(direction, socket);
        if (result === 'busy') {
            socket.emit('SETTINGS_SET_ERROR', {
                msg: "tooFast",
                address: "MAIN_CHAR",
            });
            return;
        }
        if (result) {
            socket.emit('MAIN_CHAR_STEP', result);
            socket.broadcast.emit('CHARS_STEP', {id: socket.id, location: result });
        } else {
            socket.emit('SETTINGS_SET_ERROR', {
                msg: "doNotPass",
                address: "MAIN_CHAR",
            });
        }
    }
} ;
