const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const routes = express.Router();
const upload = multer(uploadConfig);

const User = require('./controllers/UserController');
const Banner = require('./controllers/BannerController');


routes.post('/api/usuarios', User.create);
routes.post('/api/autenticacao', User.find);

routes.post('/api/banner', upload.single('image'), Banner.create);
routes.get('/api/banner',  Banner.list);
routes.delete('/api/banner',  Banner.delete);
routes.put('/api/banner',  Banner.update);


module.exports = routes;