const express = require('express');
const routes = express.Router();

const restaurants = require('../controllers/restaurant');

// get /restaurant/add-product
routes.get('/add-product',restaurants.getAddProduct);

// get /restaurant/post-product
routes.post('/add-product',restaurants.postAddProduct);

// get /restaurant/products
routes.get('/products',restaurants.getProducts);

// get /restaurant/edit-product
routes.get('/edit-product/:restaurantId',restaurants.getEditProduct);
routes.post('/edit-product',restaurants.postEditProduct);

// post /restaurant/delete-products
routes.post('/delete-product',restaurants.postDeleteProduct);

module.exports = routes;