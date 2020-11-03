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
    index(req, res, next){
        validaCookies();

        const cookies = req.cookies;
        if('session_id' in cookies){
            if(cookies.session_id === 'token'){
                return res.json({cookies});
                next();
            }else{
                return res.json({erro: 'sem cookies'});
            }
        }
        
        else{
            return res.json({erro: 'sem cookies'});
        }
    },

    async create(req, res){
        const {nome, senha} = req.body; //info do front

        let data = {};
        let user = await User.findOne({nome});

        if(!user){
            data = {nome, senha};
            user = await User.create(data);
            return res.send({user, token: generateToken({id: user.id})});
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
        res.send({user, token: generateToken({id: user.id})});
    },
}