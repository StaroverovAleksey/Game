const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true, unique: true},
    map: {ref: 'maps', type: Schema.Types.ObjectId, required: true},
    direction: {type: String, enum: ['front', 'back', 'right', 'left', ], default: 'front', required: true},
    location: {
        x: {type: Number, required: true},
        y: {type: Number, required: true},
    },
}, {
    autoIndex: process.env.NODE_ENV === 'development'
})

module.exports = model('characters', schema);
