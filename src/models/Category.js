const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    }
});

const category = mongoose.model('Category', CategorySchema);
module.exports = category;