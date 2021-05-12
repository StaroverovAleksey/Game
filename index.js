const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json({ extended: true }));
app.use(cookieParser());

/* Возврат заголовков, для кроссдоменного AJAX (только для дев режима) */
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        res.header(`Access-Control-Allow-Origin`, req.headers.origin); //адрес сервера, на котором запущен фронтенд.
        res.header(`Access-Control-Allow-Methods`, `GET, POST, OPTIONS, PUT, DELETE`);
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

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'dist')));
    app.use('/', express.static(path.join(__dirname, 'client', 'arts')));

    app.get('', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

const PORT = config.get('serverPort') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
    } catch (e) {
        console.log('Connection error', e.message);
        process.exit(1);
    }
}

start();
