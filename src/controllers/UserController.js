const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth')

function validaCookies(req, res, next){
    const {cookie} = req;
    if('session_id' in cookie){
        console.log('session id exist');
        if(cookie.session_id === jwt.sign({id:user.id}, config.secret)){
            next();
        }else{
            res.status(403).send({msg: 'sem cookie'});
        }
    }else{
        res.status(403).send({msg: 'sem cookie'});
    }
}

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

        const token = jwt.sign({id:user.id}, config.secret,{
            expiresIn: 864000, //um dia
        })

        res.cookie('session', token);
        res.send({user});
    },
}