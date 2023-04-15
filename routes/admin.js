const express = require('express');
const routes = express.Router();

const adminControl = require('../controllers/admin');

// midelleware for the protection of the routes
const routeProtection = require('../middleware/protection');

//get /admin/add-product
routes.get('/add-product',routeProtection,adminControl.getAddProduct);

//post /admin/post-product
routes.post('/add-product',routeProtection,adminControl.postAddProduct);

// /get /admin/products
routes.get('/products',routeProtection,adminControl.getProducts);

// /get /admin/edit-product
routes.get('/edit-product/:productId',routeProtection,adminControl.getEditProduct);
routes.post('/edit-product',routeProtection,adminControl.postEditProduct);

// post /admin/delete-products
routes.post('/delete-product',routeProtection,adminControl.postDeleteProduct);
routes.get('/restaurants',routeProtection,adminControl.getRestraunts);



module.exports = routes; 