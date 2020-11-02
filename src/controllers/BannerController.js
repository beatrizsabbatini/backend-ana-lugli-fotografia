const Banner = require('../models/Banner');

module.exports = {

    async create(req, res){
        const {title} = req.body; 
        const {filename: image} = req.file;

        let bannerItem = await Banner.create({title, image});

        return res.json(bannerItem)
    }, 

}