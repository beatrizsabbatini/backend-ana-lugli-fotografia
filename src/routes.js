const express = require('express');
const cookies = require('cookie-parser');

const routes = express.Router();

const User = require('./controllers/UserController');

routes.get('/',(req,res) =>{
    res.send('we are on home on post');
})

routes.post('/api/usuarios', User.create);
routes.post('/api/autenticacao', User.find);

module.exports = routes;