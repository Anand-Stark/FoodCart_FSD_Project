const express = require('express');
const routes = express.Router();
const userShop = require('../controllers/userShop');


routes.get('/',userShop.userHomePage);

module.exports = routes;

