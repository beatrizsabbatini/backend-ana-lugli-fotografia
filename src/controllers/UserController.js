const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

function generateToken (params={}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, //um dia
    });
}

module.exports = {
 
    async create(req, res){
        const {nome, senha} = req.body; //info do front
        let data = {};
        let user = await User.findOne({nome});

        if(!user){
            data = {nome, senha};
            user = await User.create(data);
            return res.send({user, token: generateToken({adm: user.admin})});
        }
        else{
            return res.status(400).send({error: 'Registro já existe com esse nome'});
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

        //res.cookie('session_id', 'token',{expire: 360000 + Date.now()});
        res.send({user, token: generateToken({adm: user.admin})});
    },
}