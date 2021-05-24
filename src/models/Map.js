const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    group: {type: String, required: true},
    start: {type: Boolean, required: false},
    size: {
        x: {type: Number, required: true},
        y: {type: Number, required: true},
    },
    cells: {
        type: Map,
        required: true,
        of: {
            terrains: {
                type: Array,
                required: false,
                of: {ref: 'terrains', type: Schema.Types.ObjectId, required: false}
            }
        }
    }
}, {
    autoIndex: process.env.NODE_ENV === 'development'
})

module.exports = model('maps', schema);
