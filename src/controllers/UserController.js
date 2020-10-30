const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    index(req, res){
        res.json({message:'Hello'});
    },

    async create(req, res){
        const {nome, senha} = req.body; //info do front

        let data = {};
        let user = await User.findOne({nome});

        if(!user){
            data = {nome, senha};
            user = await User.create(data);
            return res.send({user});
        }
        else{
            return res.status(400).send({error: 'registro com erro'});
        }
    }, 

    async find(req, res){
        const { nome, senha } = req.body;
        const user = await User.findOne({nome}).select('+senha');

        if(!user){
            return res.status(400).send({error: 'User not found'});
        }

        if (!await bcrypt.compare(senha, user.senha)){
            return res.status(400).send({error: 'Senha invalida'});
        }

        user.senha= undefined;

        res.send({user});
    }
}