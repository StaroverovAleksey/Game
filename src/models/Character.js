const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true, unique: true},
    map: {ref: 'maps', type: Schema.Types.ObjectId, required: true},
    location: {type: String, default: '1_1'},
}, {
    autoIndex: process.env.NODE_ENV === 'development'
})

module.exports = model('characters', schema);
