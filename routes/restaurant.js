const express = require('express');
const routes = express.Router();

const restaurants = require('../controllers/restaurant');

// midelleware for the protection of the routes
const routeProtection = require('../middleware/protection');

// get /restaurant/add-product
routes.get('/add-product', routeProtection,restaurants.getAddProduct);

// get /restaurant/post-product
routes.post('/add-product',routeProtection,restaurants.postAddProduct);

// get /restaurant/products
routes.get('/products',routeProtection,restaurants.getProducts);

// get /restaurant/edit-product
routes.get('/edit-product/:restaurantId',routeProtection,restaurants.getEditProduct);
routes.post('/edit-product',routeProtection,restaurants.postEditProduct);

// post /restaurant/delete-products
routes.post('/delete-product',routeProtection,restaurants.postDeleteProduct);

module.exports = routes;