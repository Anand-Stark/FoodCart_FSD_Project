const express = require('express');
const routes = express.Router();

const authentication = require('../controllers/auth');

// get /auth-login
routes.get('/auth-login',authentication.getAuthenticationLogin);

// get /auth-singup
routes.get('/auth-signup',authentication.getAuthenticationSignup);

// post /auth-login
routes.post('/auth-login',authentication.postAuthenticationLogin);

module.exports = routes;