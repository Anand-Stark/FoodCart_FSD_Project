const express = require('express');
const routes = express.Router();
const userShop = require('../controllers/userShop');

// midelleware for the protection of the routes
const adminRouteProtection = require('../middleware/adminProtection');
const restaurantProtection = require('../middleware/restaurantProtection');
const userProtection = require('../middleware/userProtection');
const homeRouteProtection = require('../middleware/homeRouteProtection');

routes.get('/',homeRouteProtection,userShop.userHomePage);

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

// creating a post route for deleting the cart products:
routes.post('/delete-cart-product',userProtection,userShop.postDeleteCartProduct);

// creating get routes for all kind of foods:
routes.get('/non-veg',userProtection,userShop.getNonVeg);
routes.get('/veg',userProtection,userShop.getVeg);
routes.get('/italian',userProtection,userShop.getItalian);
routes.get('/chinese',userProtection,userShop.getChinese);

// creatring post route for user feedback
routes.post('/feedback',userProtection,userShop.postFeedback);

// creating get route for user feedback
routes.get('/feedback',userProtection,userShop.getFeedback);

// creating post route for user written feedbacks:
routes.post('/feedback-user-product',userProtection,userShop.postUserFeedback);

// creating routes for get and post orders:
routes.get('/orders',userProtection,userShop.getOrder);
routes.post('/orders',userProtection,userShop.postOrder);

module.exports = routes;

