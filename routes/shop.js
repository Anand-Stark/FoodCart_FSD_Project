const express = require('express');
const routes = express.Router();
const userShop = require('../controllers/userShop');


routes.get('/',userShop.userHomePage);

// creating the cart routes here
routes.get('/cart',userShop.getCart);

// posting the cart
routes.post('/add-to-cart',userShop.postCart);

// cretaing a get route for the searched product
routes.get('/searched-product',userShop.getSearchProduct);

// creating a post route for a search bar sort of thing:
routes.post('/search-bar',userShop.postSearchProduct);

// creating a post route for adding quantity
routes.post('/add-quantity',userShop.postAddQuantity);

// creating a post route for deleting quantity
routes.post('/decrease-quantity',userShop.postDecreaseQuantity)

module.exports = routes;

