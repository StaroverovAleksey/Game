const {Schema, model} = require('mongoose');

const schema = new Schema({
    number: {type: Number, required: true},
    name: {type: String, required: true},
    sort: {type: String, required: true},
    path: {type: String, required: true},
    passability: {type: Boolean, required: true},
})

module.exports = model('terrains', schema);