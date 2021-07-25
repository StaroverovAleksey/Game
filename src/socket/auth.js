const User = require('../models/User');
const game = require('../main/Game');
const bcrypt = require("bcrypt");

module.exports = {
    async authorization (body, socket) {
        const {email, password} = body;
        const user = await User.findOne({email}, 'password characters id').populate('characters', 'name level appearance');
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
        //const char = await game.setChar(user.character, socket.id);
        const checkIsAuth = await game.setUser(user.id, socket.id)

        if (checkIsAuth) {
            socket.emit('SETTINGS_SET_ERROR', {
                msg: "loginIsExist",
                address: "AUTH",
            });
            socket.to(checkIsAuth).emit('SETTINGS_DEFAULT', '');
            socket.to(checkIsAuth).emit('MAP_CELLS_DEFAULT', '');
            socket.to(checkIsAuth).emit('MAIN_CHAR_DEFAULT', '');
            socket.to(checkIsAuth).emit('CHARS_DEFAULT', '');
        } else {
            socket.emit('SETTINGS_CHANGE_ROUTER', 'choiceChar');
            socket.emit('CHOICE_CHAR_INITIAL', user.characters);
        }
    },

    async getMainCharList (body, socket) {
        const {id} = socket;
        console.log(body);
        console.log(game);
        console.log(game.chars[id]);
    },

    /*async authorization (body, socket) {
        const {email, password} = body;
        const user = await User.findOne({email}, 'password character');
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
        const char = await game.setChar(user.character, socket.id);

        if (typeof char === 'string') {
            socket.emit('SETTINGS_SET_ERROR', {
                msg: "loginIsExist",
                address: "AUTH",
            });
            socket.to(char).emit('SETTINGS_DEFAULT', '');
            socket.to(char).emit('MAP_CELLS_DEFAULT', '');
            socket.to(char).emit('MAIN_CHAR_DEFAULT', '');
            socket.to(char).emit('CHARS_DEFAULT', '');
            process.io.emit('CHARS_REMOVE', char);
        } else {
            socket.broadcast.emit('CHARS_ADD', {[socket.id]: char});
            socket.emit('SETTINGS_CHANGE_ROUTER', 'main');
            socket.emit('MAIN_CHAR_INITIAL', char);
            socket.emit('CHARS_INITIAL', game.getCharsExceptSelf(socket.id));
            socket.emit('MAP_CELLS_INITIAL', game.mapCells);
            socket.emit('SETTINGS_SET_MAP_SIZE', game.mapSize);
        }
    },
*/
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
