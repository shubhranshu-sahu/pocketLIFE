const mongoose = require('mongoose');

const DateSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    date: {
        type: Date,
        required: true,
        // default to today at 00:00 UTC
        default: () => {
          const now = new Date();
          return new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate()
          ));
        },
        // normalize any manually provided date to its UTC-midnight
        set: d => {
          const dt = new Date(d);
          return new Date(Date.UTC(
            dt.getUTCFullYear(),
            dt.getUTCMonth(),
            dt.getUTCDate()
          ));
        }
    },
    title: {
        type: String,
        trim: true,
        maxlength: 100
    },
    content: {
        type: String,
        required: true
    },
    image:{
        type: String,
        default: ''
    },
    mood: {
        type: String,
        default: 'grey',
        required:true
    }
})

module.exports = mongoose.model('dates', DateSchema);