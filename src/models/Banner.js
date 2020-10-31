const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    }
});

const banner = mongoose.model('Banner', BannerSchema);
module.exports = banner;