const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortURL: String,
    longURL: String
});

module.exports = mongoose.model('Url', urlSchema);