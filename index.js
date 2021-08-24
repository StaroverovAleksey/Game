const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const socket = require('socket.io');
const cookieParser = require("cookie-parser");
const game = require('./src/main/Game');
require('dotenv').config();

const app = express();

app.use(express.json({ extended: true }));
app.use(cookieParser());

/* Возврат заголовков, для кроссдоменного AJAX (только для дев режима) */
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        res.header(`Access-Control-Allow-Origin`, req.headers.origin); //адрес сервера, на котором запущен фронтенд.
        res.header(`Access-Control-Allow-Methods`, `GET, POST, OPTIONS, PUT, PATCH, DELETE`);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept, Set-Cookie`);
        next();
    });
}

app.use('/api/auth', require('./src/expressRoutes/auth.expressRoutes'));
app.use('/api/character', require('./src/expressRoutes/character.expressRoutes'));
app.use('/api/terrains', require('./src/expressRoutes/terrain.expressRoutes'));
app.use('/api/maps', require('./src/expressRoutes/map.expressRoutes'));
app.use('/api/map-cells', require('./src/expressRoutes/mapCell.expressRoutes'));
app.use('/api/structures', require('./src/expressRoutes/structure.expressRoutes'));
app.use('/', express.static(path.join(__dirname, 'arts')));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'clients', 'gameCreator', 'dist')));

    app.get('', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'gameCreator', 'dist', 'index.html'));
    });
}

async function start() {

    try {
        await mongoose.connect(process.env.DB_CONNECT_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        const server = app.listen(process.env.APP_PORT, () => console.log(`App has been started on port ${process.env.APP_PORT}`));


        process.io = socket(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        process.io.on('connection', (socket) => {


            socket.use(([event, body]) => {
                if (!game.start) {
                    socket.emit('SERVER_DISCONNECT', '');
                    return;
                }
                try {
                    const [resource, method] = event.split('/');
                    require(`./src/socketRoutes/${resource}.socketRoutes`)[method](body, socket);
                } catch (e) {
                    socket.emit('RESOURCE_NOT_FOUND', event);
                }
            });

            socket.on('disconnect', () => {
                game.removeUser(socket.id);
                game.removeChar(socket.id);
            })
        });

    } catch (e) {
        console.log('Connection error', e.message);
        process.exit(1);
    }
}

start();
