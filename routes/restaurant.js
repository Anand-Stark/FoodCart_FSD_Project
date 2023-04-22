const express = require('express');
const routes = express.Router();

const restaurants = require('../controllers/restaurant');
// midelleware for the protection of the routes
const adminRouteProtection = require('../middleware/adminProtection');
const restaurantProtection = require('../middleware/restaurantProtection');
const userProtection = require('../middleware/userProtection');

// get /restaurant/add-product
routes.get('/add-product', adminRouteProtection,restaurants.getAddProduct);

// get /restaurant/post-product
routes.post('/add-product',adminRouteProtection,restaurants.postAddProduct);

// get /restaurant/products
routes.get('/products',adminRouteProtection,restaurants.getProducts);

// get /restaurant/edit-product
routes.get('/edit-product/:restaurantId',adminRouteProtection,restaurants.getEditProduct);
routes.post('/edit-product',adminRouteProtection,restaurants.postEditProduct);

// post /restaurant/delete-products
routes.post('/delete-product',adminRouteProtection,restaurants.postDeleteProduct);

module.exports = routes;