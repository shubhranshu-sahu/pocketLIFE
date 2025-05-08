const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        require
    },
    image:{
        type: String,
        require
    },
    time:{
        type: Date, 
        default: Date.now,
    }
})

module.exports = mongoose.model('users', UserSchema);