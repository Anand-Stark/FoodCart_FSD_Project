const Sequelize = require('sequelize');

// initializing the database
const sequeqlize = new Sequelize('foodcart','root','ANANd#2021',{
    host:'localhost',
    dialect:'mysql'
}    ) ;

module.exports = sequeqlize;

