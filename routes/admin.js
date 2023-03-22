const express = require('express');
const routes = express.Router();

const adminProducts = require('../controllers/admin');

//get /admin/add-product
routes.get('/add-product',adminProducts.getAddProduct);

//post /admin/post-product
routes.post('/add-product',adminProducts.postAddProduct);

// /get /admin/products
routes.get('/products',adminProducts.getProducts);

// /get /admin/edit-product
routes.get('/edit-product/:productId',adminProducts.getEditProduct);
routes.post('/edit-product',adminProducts.postEditProduct);

// post /admin/delete-products
routes.post('/delete-product',adminProducts.postDeleteProduct);
routes.get('/restaurants',adminProducts.getRestraunts)

module.exports = routes; 