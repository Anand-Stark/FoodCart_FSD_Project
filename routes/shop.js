const express = require('express');
const routes = express.Router();
const userShop = require('../controllers/userShop');

// midelleware for the protection of the routes
const adminRouteProtection = require('../middleware/adminProtection');
const restaurantProtection = require('../middleware/restaurantProtection');
const userProtection = require('../middleware/userProtection');
const homeRouteProtection = require('../middleware/homeRouteProtection');

routes.get('/',userShop.userHomePage);

// creating the cart routes here
routes.get('/cart',userProtection,userShop.getCart);

// posting the cart
routes.post('/add-to-cart',userProtection,userShop.postCart);

// cretaing a get route for the searched product
routes.get('/searched-product',userProtection,userShop.getSearchProduct);

// creating a post route for a search bar sort of thing:
routes.post('/search-bar',userProtection,userShop.postSearchProduct);

// creating a post route for adding quantity
routes.post('/add-quantity',userProtection,userShop.postAddQuantity);

// creating a post route for deleting quantity
routes.post('/decrease-quantity',userProtection,userShop.postDecreaseQuantity)

module.exports = routes;

