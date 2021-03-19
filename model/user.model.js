const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    cloudId: {
        type: String,
        required: true
    },
    dateUpdate: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('users', UserSchema);