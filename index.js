const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/map-cell-type', require('./src/routes/mapCellType.route'));
app.use('/api/map-cell', require('./src/routes/mapCell.route'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

const PORT = config.get('serverPort') || 5000;

async function start() {
    try {
        await mongoose.connect(`${config.get('mongoUri')}:${config.get('mongoPort')}/main_db`, {
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
