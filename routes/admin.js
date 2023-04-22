const express = require('express');
const routes = express.Router();

const adminControl = require('../controllers/admin');

// midelleware for the protection of the routes
const adminRouteProtection = require('../middleware/adminProtection');
const restaurantProtection = require('../middleware/restaurantProtection');
const userProtection = require('../middleware/userProtection');

//get /admin/add-product
routes.get('/add-product',restaurantProtection,adminControl.getAddProduct);

//post /admin/post-product
routes.post('/add-product',restaurantProtection, adminControl.postAddProduct);

// /get /admin/products
routes.get('/products',restaurantProtection,adminControl.getProducts);

// /get /admin/edit-product
routes.get('/edit-product/:productId',restaurantProtection,adminControl.getEditProduct);
routes.post('/edit-product',restaurantProtection,adminControl.postEditProduct);

// post /admin/delete-products
routes.post('/delete-product',restaurantProtection,adminControl.postDeleteProduct);
routes.get('/restaurants',adminRouteProtection,adminControl.getRestraunts);



module.exports = routes; 