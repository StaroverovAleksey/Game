const {Schema, model} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    accessLevel: {type: String, default: 'user'},
    //character: {ref: 'characters', type: Schema.Types.ObjectId},
    characters: {
        type: Array,
        default: [],
        of: {ref: 'characters', type: Schema.Types.ObjectId}
    }
}, {
    autoIndex: process.env.NODE_ENV === 'development'
})

module.exports = model('users', schema);
