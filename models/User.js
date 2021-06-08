const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:
    {
        type: String,
        unique: true,
        required: true
    },
    email: String,
    password: String
});

module.exports = mongoose.model('users', UserSchema);