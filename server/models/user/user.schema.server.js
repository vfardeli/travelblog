var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    avatar: String,
    firstName: String,
    lastName: String,
    email: String,
    facebook: {
        id: String,
        token: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { collection: 'user' });

module.exports = UserSchema;