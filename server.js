const express = require('express');
const cors = require ('cors');
const cookie = require('cookie-parser');
const moongose = require('mongoose');
const routes = require('./src/routes');
const cookieParser = require('cookie-parser');

const app = express();

moongose.connect('mongodb+srv://beatriz:1915932@analugli.bykl8.mongodb.net/AnaLugli?retryWrites=true&w=majority',{
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

app.listen(3333);