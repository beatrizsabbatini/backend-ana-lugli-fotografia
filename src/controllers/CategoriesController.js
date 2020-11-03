const Category = require('../models/Category');

module.exports = {

    async create(req, res){
        const {title} = req.body; 
        const {filename: image} = req.file;

        let categoryItem = await Category.create({title, image});

        return res.json({ categoryItem })
    }, 

    async find(req, res){
        const {title} = req.body; 
        let categoria = await Category.findOne({title});

        if(categoria){
           return res.json({categoria});
        }
        else{
            res.json({mensagem: 'não foi possivel encontrar'});
        }
    }, 

    async list(req, res){

        let categoryItems = await Category.find();

        return res.json(categoryItems)
    }, 


}