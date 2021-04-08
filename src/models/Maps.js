const {Schema, model} = require('mongoose');

const schema = new Schema({
    cells: {
        type: Map,
        of: {
            terrain: {ref: 'terrains', type: Schema.Types.ObjectId, unique: false}
        }
    }
}, {
    autoIndex: process.env.NODE_ENV === 'development'
})

module.exports = model('maps', schema);
