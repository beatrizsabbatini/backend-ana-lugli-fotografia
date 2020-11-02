const Banner = require('../models/Banner');

module.exports = {

    async create(req, res){
        const {title} = req.body; 
        const {filename: image} = req.file;

        let bannerItem = await Banner.create({title, image});

        return res.json(bannerItem)
    }, 

    async list(req, res){

        let bannerItems = await Banner.find();

        return res.json(bannerItems)
    }, 

    async delete(req, res){

        const { bannerItemId } = req.body;

        try {
            await Banner.findByIdAndRemove(bannerItemId);
            return res.send({message: "Sucesso ao excluir!"})
        } catch (error) {
            return res.status(400).send({message: "Erro ao excluir!"})
        }

    }, 

}