const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: String,
    group: String,
    size: {
        x: Number,
        y: Number
    },
    cells: {
        type: Map,
        of: {
            terrain: {ref: 'terrains', type: Schema.Types.ObjectId}
        }
    }
}, {
    autoIndex: process.env.NODE_ENV === 'development'
})

module.exports = model('maps', schema);
