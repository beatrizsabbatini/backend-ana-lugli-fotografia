const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const routes = express.Router();
const upload = multer(uploadConfig);

const User = require('./controllers/UserController');
const Banner = require('./controllers/BannerController');
const About = require('./controllers/AboutController');
const Category = require('./controllers/CategoriesController');

const auth = require('./middlewares/auth');

routes.post('/api/usuarios', User.create);
routes.post('/api/autenticacao', User.find);

routes.post('/api/banner', auth, upload.single('image'), Banner.create);
routes.get('/api/banner',  Banner.list);
routes.delete('/api/banner',  Banner.delete);

routes.post('/api/about', auth, upload.single('image'), About.create);
routes.get('/api/about', About.list);
//routes.put('/api/about/', About.edit);


routes.post('/api/category', auth, upload.single('image'), Category.create);
routes.post('/api/category/find',Category.find);
routes.get('/api/category', Category.list);

module.exports = routes;