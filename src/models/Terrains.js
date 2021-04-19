const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    group: {type: String, required: true},
    fileName: {type: String, required: true},
    passability: {type: Boolean, required: true},
}, {
    autoIndex: process.env.NODE_ENV === 'development'
})

module.exports = model('terrains', schema);
