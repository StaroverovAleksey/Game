const {Schema, model} = require('mongoose');

const schema = new Schema({
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    type: {ref: 'terrains', type: Schema.Types.ObjectId}
})

module.exports = model('map_cells', schema);
