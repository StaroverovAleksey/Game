const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const index = express();

index.use(express.json({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    index.use('/', express.static(path.join(__dirname, 'client', 'dist')));

    index.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

const PORT = config.get('serverPort') || 5000;

async function start() {
    try {
        await mongoose.connect(`${config.get('mongoUri')}:${config.get('mongoPort')}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        index.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
    } catch (e) {
        console.log('Connection error', e.message);
    }
}

start();
