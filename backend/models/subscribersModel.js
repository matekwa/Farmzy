const mongoose = require('mongoose');

const subscribersTemplate = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('skyfalke_subscribers', subscribersTemplate);

