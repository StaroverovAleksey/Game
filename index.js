const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));

/* Возврат заголовков, для кроссдоменного AJAX */
app.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `*`);
    res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
    next();
});

app.use('/api/terrain', require('./src/routes/terrains'));
app.use('/api/map-cell', require('./src/routes/mapCell.route'));

if (process.env.NODE_ENV === 'production') {
    //app.use('/', express.static(path.join(__dirname, 'client', 'dist')));
    app.use('/', express.static(path.join(__dirname, 'client', 'src')));

    app.get('*', (req, res) => {
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
    }
}

start();
