const express = require('express');
const routes = express.Router();

const authentication = require('../controllers/auth');


//route for a login form page basically 
routes.get('/auth-login',authentication.getLogin);

// routes for a signup form page basically
routes.get('/auth-signup',authentication.getsignup);

// post route for a login form page
routes.post('/auth-login',authentication.postLogin);

// post route for a signup form page
routes.post('/auth-signup',authentication.postSignup);

// post route for registration
routes.post('/auth-logout',authentication.postLogOut);

// making a route for loggin in the admin
routes.get('/auth-admin-login',authentication.getAdminLogin);

// making a route for only the admin to login
routes.post('/auth-admin-login',authentication.postAdminLogin);

// making a route for the restaurant owner to signup
routes.get('/auth-restaurant-signup',authentication.getRestaurantSignup);

// making a route for restaurant owner -> post signup
routes.post('/auth-restaurant-signup',authentication.postRestaurantSignup);

// making a route for the restaurant owner to login
routes.get('/auth-restaurant-login',authentication.getRestaurantLogin);

// making a route for restaurant owner -> post login
routes.post('/auth-restaurant-login',authentication.postRestaurantLogin);

module.exports = routes;