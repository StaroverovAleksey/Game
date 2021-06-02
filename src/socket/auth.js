const User = require('../models/User');
const Character = require('../models/Character');
const game = require('../main/game');
const bcrypt = require("bcrypt");

module.exports = {
    async authorization (body, socket) {
        const {email, password} = body;
        const user = await User.findOne({email});
        if(!user) {
            socket.emit('SETTINGS_SET_ERROR', {
                msg: "incorrectAuthData",
                address: "AUTH",
            });
            return;
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            socket.emit('SETTINGS_SET_ERROR', {
                msg: "incorrectAuthData",
                address: "AUTH",
            });
            return;
        }
        const char = await Character.findById(user.character);
        const newChar = game.setChar(char, socket);

        socket.broadcast.emit('CHARS_ADD', newChar);
        socket.emit('SETTINGS_CHANGE_ROUTER', 'main');
        socket.emit('MAIN_CHAR_INITIAL', char);
        socket.emit('CHARS_INITIAL', game.getCharsExceptSelf(socket.id));
        socket.emit('MAP_CELLS_INITIAL', game.mapCells);
        socket.emit('SETTINGS_SET_MAP_SIZE', game.mapSize);
    },

    exit (body, socket) {
        const {id} = socket;
        game.removeChar(id);

        socket.emit('SETTINGS_DEFAULT', '');
        socket.emit('MAP_CELLS_DEFAULT', '');
        socket.emit('MAIN_CHAR_DEFAULT', '');
        socket.emit('CHARS_DEFAULT', '');
        process.io.emit('CHARS_REMOVE', id);
    }
} ;
