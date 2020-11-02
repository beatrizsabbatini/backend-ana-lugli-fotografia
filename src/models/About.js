const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const about = mongoose.model('About', AboutSchema);
module.exports = about;