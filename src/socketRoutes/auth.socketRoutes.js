const UserModel = require('../models/User.model');
const CharModel = require('../models/Char.model');
const game = require('../main/Game');
const bcrypt = require("bcrypt");
const fs = require("fs");

module.exports = {

    debug (body, socket) {
        switch (body) {
            case 'all': socket.emit('DEBUG_ALL', game); break;
            case 'maps': socket.emit('DEBUG_MAPS', game._maps); break;
            case 'users': socket.emit('DEBUG_USERS', game._users); break;
            case 'chars': socket.emit('DEBUG_CHARS', game._chars); break;
        }
    },

    async authorization (body, socket) {
        const {email, password} = body;
        const user = await UserModel.findOne({email}, '');
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

        const loggedUserId = game.checkUserLogged(user.id);
        if (loggedUserId) {
            game.removeUser(loggedUserId);
            game.removeChar(loggedUserId);
            socket.emit('SETTINGS_SET_ERROR', {
                msg: "loginIsExist",
                address: "AUTH",
            });
            socket.to(loggedUserId).emit('SETTINGS_DEFAULT', '');
            socket.to(loggedUserId).emit('MAP_CELLS_DEFAULT', '');
            socket.to(loggedUserId).emit('MAIN_CHAR_DEFAULT', '');
            socket.to(loggedUserId).emit('CHARS_DEFAULT', '');
        } else {
            game.addUser({user, socketId: socket.id});
            const {characters} = await UserModel.findById(user.id, 'characters').populate('characters', 'name level appearance direction');
            socket.emit('SETTINGS_CHANGE_ROUTER', 'choiceChar');
            socket.emit('CHOICE_CHAR_LIST_INITIAL', characters);
        }
    },

    async enterGame ({id}, socket) {
        const {id: socketId} = socket;
        const char = await CharModel.findById(id);
        const charBelongsUser = game._users[socketId].characters.includes(char.id);
        if (!char || !charBelongsUser) {
            socket.emit('SETTINGS_SET_ERROR', {
                msg: "charDoesNotExist",
                address: "CHOICE_CHAR",
            });
            return;
        }

        game.addChar({char, socketId});
        socket.broadcast.emit('CHARS_ADD', {[socketId]: char});
        socket.emit('SETTINGS_CHANGE_ROUTER', 'main');
        socket.emit('MAIN_CHAR_INITIAL', char);
        //socketRoutes.emit('CHARS_INITIAL', game.getCharsExceptSelf(socketRoutes.id));
        socket.emit('MAP_CELLS_INITIAL', game._maps[char.map].cells);
        socket.emit('SETTINGS_SET_MAP_SIZE', game._maps[char.map].size);
        socket.emit('SETTINGS_SET_MAP_SIZE', game._maps[char.map].size);
    },

    exit (body, socket) {
        const {id} = socket;
        game.removeUser(id);
        game.removeChar(id);

        socket.emit('SETTINGS_DEFAULT', '');
        socket.emit('MAP_CELLS_DEFAULT', '');
        socket.emit('MAIN_CHAR_DEFAULT', '');
        socket.emit('CHARS_DEFAULT', '');
        process.io.emit('CHARS_REMOVE', id);
    },

    getArts (body, socket) {
        const paths = [];
        const recursion = (path) => {
            try {
                const dirList = fs.readdirSync(path);
                for (let dir of dirList) {
                    if (dir !== 'utils' && dir !== 'pictures') {
                        recursion(`${path}/${dir}`);
                    }
                }
            } catch (error) {
                paths.push(path);
            }
        }
        recursion('arts');
        socket.emit('SETTINGS_SET_ART_PATHS', paths);
    }
} ;
