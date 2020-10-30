const express = require('express');
const cors = require ('cors');
const cookie = require('cookie-parser');
const moongose = require('mongoose');
const routes = require('./src/routes');
const cookieParser = require('cookie-parser');

const app = express();

moongose.connect('mongodb://localhost:27017/trabalho',{
    useNewUrlParser:true,    
    useUnifiedTopology:true,
}, function (err){
    if(err){
        console.log(err)
    }else{
        console.log('Conectado');
    }
})

app.use(cors()); //informar qual dominio pode consumir o dado da api

app.use(cookieParser());

app.use(express.json());

app.use(routes);

app.listen(3000);