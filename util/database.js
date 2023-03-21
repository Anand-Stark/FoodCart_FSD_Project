const Sequelize = require('sequelize');

// initializing the database
const sequeqlize = new Sequelize('foodcart','root','220755',{
    host:'localhost',
    dialect:'mysql'
}    ) ;

module.exports = sequeqlize;

