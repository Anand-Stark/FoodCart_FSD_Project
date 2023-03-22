const Sequelize = require('sequelize');

// initializing the database
const sequeqlize = new Sequelize('foodcart','root','ANANd#2021',{
    host:'./foodcart.sqlite',
    dialect:'sqlite',
    logging:false,
}    ) ;

module.exports = sequeqlize;

