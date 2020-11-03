const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({error: 'No token provided no auth'});
    }

    const parts = authHeader.split(' ');

    const[scheme, token] = parts;

    jwt.verify(token, authConfig.secret, (err, decoded) =>{
        if(!decoded.adm){
            
            return res.status(401).send({error: 'nao é admin'});
        }
        next();
    });

}