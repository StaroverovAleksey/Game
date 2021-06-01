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
                'msg': "incorrectAuthData",
                'address': "auth",
            });
            return;
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            socket.emit('SETTINGS_SET_ERROR', {
                'msg': "incorrectAuthData",
                'address': "auth",
            });
            return;
        }
        const char = await Character.findById(user.character);
        game.setChar(char, socket);
        socket.emit('SETTINGS_CHANGE_ROUTER', 'main');
        socket.emit('MAIN_CHAR_INITIAL', char);
        socket.emit('CHARS_INITIAL', game.getCharsExceptSelf(socket.id));
        socket.emit('MAP_CELLS_INITIAL', game.mapCells);
        socket.emit('SETTINGS_SET_MAP_SIZE', game.mapSize);
    },

    exit (body, socket) {
        game.removeChar(socket.id);
        socket.emit('SETTINGS_CHANGE_ROUTER', 'login');
    }
} ;
