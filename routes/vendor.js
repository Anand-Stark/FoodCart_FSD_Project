const express = require('express');
const routes = express.Router();

const vendorProducts = require('../controllers/vendor');

// get /vendor/add-product
routes.get('/add-product',vendorProducts.getAddProduct);

// get /vendor/post-product
routes.post('/add-product',vendorProducts.postAddProduct);

// get /vendor/products
routes.get('/products',vendorProducts.getProducts);

// get /vendor/edit-product
routes.get('/edit-product/:productId',vendorProducts.getEditProduct);
routes.post('edit-product',vendorProducts.postEditProduct);

// post /admin/delete-products
routes.post('/delete-product',vendorProducts.postDeleteProduct);

module.exports = routes;