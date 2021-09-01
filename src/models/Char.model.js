const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true, unique: true},
    map: {type: String, required: true},
    direction: {type: String, enum: ['front', 'back', 'right', 'left', ], default: 'front', required: true},
    level: {type: Number, default: 0, required: true},
    location: {
        type: Object,
        of: {
            x: {type: Number, required: true},
            y: {type: Number, required: true},
        }
    },
    appearance: {
        type: Object,
        of: {
            sex: {type: String, required: true},
            body: {type: String, required: true},
            hairType: {type: String, required: true},
            hairColor: {type: String, required: true},
        }
    }
}, {
    autoIndex: process.env.NODE_ENV === 'development'
})

module.exports = model('characters', schema);
