const express = require('express');
const routes = express.Router();
const userShop = require('../controllers/userShop');

// midelleware for the protection of the routes
const routeProtection = require('../middleware/protection');


routes.get('/',routeProtection,userShop.userHomePage);

// creating the cart routes here
routes.get('/cart',routeProtection,userShop.getCart);

// posting the cart
routes.post('/add-to-cart',routeProtection,userShop.postCart);

// cretaing a get route for the searched product
routes.get('/searched-product',routeProtection,userShop.getSearchProduct);

// creating a post route for a search bar sort of thing:
routes.post('/search-bar',routeProtection,userShop.postSearchProduct);

// creating a post route for adding quantity
routes.post('/add-quantity',routeProtection,userShop.postAddQuantity);

// creating a post route for deleting quantity
routes.post('/decrease-quantity',routeProtection,userShop.postDecreaseQuantity)

module.exports = routes;

