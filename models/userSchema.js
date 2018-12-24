const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    salt:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});
let User = mongoose.model('User', UserSchema);
module.exports = User;