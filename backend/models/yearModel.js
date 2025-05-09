const mongoose = require('mongoose');

const DateColor = mongoose.Schema({
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
    mood: {
        type: Number,
        default: 1,
        required: true,
    }

})

const YearModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required:true,
    },
    year:{
        type: Number,
        required:true,
        length: 4,
    },
    data:[{
        type: DateColor,
        default: []
    }]
})

module.exports = mongoose.model('years', YearModel);