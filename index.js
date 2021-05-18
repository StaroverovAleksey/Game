const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
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

app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/character', require('./src/routes/character.routes'));
app.use('/api/terrains', require('./src/routes/terrain.routes'));
app.use('/api/maps', require('./src/routes/map.routes'));
app.use('/api/map-cells', require('./src/routes/mapCell.routes'));
app.use('/', express.static(path.join(__dirname, 'arts')));

if (process.env.NODE_ENV === 'production') {



    app.get('', (req, res) => {
        console.log(req.headers.origin);
        if(req.headers.origin && parseInt(req.headers.origin.split(':')[1]) === process.env.ADMIN_PORT) {
            app.use('/', express.static(path.join(__dirname, 'clients', 'gameCreator', 'dist')));
            res.sendFile(path.resolve(__dirname, 'clients', 'gameCreator', 'dist', 'index.html'));
        } else {
            app.use('/', express.static(path.join(__dirname, 'clients', 'game', 'dist')));
            res.sendFile(path.resolve(__dirname, 'client', 'game', 'dist', 'index.html'));
        }

    });
}

async function start() {
    try {
        await mongoose.connect(process.env.DB_CONNECT_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(process.env.APP_PORT, () => console.log(`App has been started on port ${process.env.APP_PORT}`));
        if (process.env.NODE_ENV === 'production') {
            app.listen(process.env.ADMIN_PORT, () => console.log(`App has been started on port ${process.env.ADMIN_PORT}`));
        }
    } catch (e) {
        console.log('Connection error', e.message);
        process.exit(1);
    }
}

start();
