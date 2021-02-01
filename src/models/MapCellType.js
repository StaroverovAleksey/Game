const {Schema, model} = require('mongoose');

const schema = new Schema({
    number: {type: Number, required: true},
    name: {type: String, required: true},
    terrain: {type: String, required: true},
    file: {type: Buffer, required: true},
    passability: {type: Boolean, required: true},
})

module.exports = model('map_cell_types', schema);
