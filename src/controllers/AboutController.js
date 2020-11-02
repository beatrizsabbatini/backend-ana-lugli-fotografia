const About = require('../models/About');

module.exports = {

    async create(req, res){
        const {title, description} = req.body; 
        const {fileName: image} = req.file;

        let aboutItem = await About.create({title, description, image});

        return res.json({ aboutItem })
    }, 

}