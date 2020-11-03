const About = require('../models/About');

module.exports = {

    async create(req, res){
        const {title, description} = req.body; 
        const {filename: image} = req.file;
        let aboutItem = await About.create({title, description, image});
        
        return res.json({ aboutItem });            
    },

    async list(req, res){

        let aboutItem = await About.find();

        return res.json(aboutItem);
    }, 

    async edit (req, res){
    
        //let aboutItem = await About.updateOne({_id}, $set: {title: req.body.title});
      
    }

}