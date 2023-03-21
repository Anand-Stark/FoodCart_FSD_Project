const express = require('express');
const routes = express.Router();
const userShop = require('../controllers/userShop');


routes.get('/',userShop.userHomePage);

// creating the cart routes here
routes.get('/cart',userShop.getCart);

// posting the cart
routes.post('/add-to-cart',userShop.postCart)

module.exports = routes;

