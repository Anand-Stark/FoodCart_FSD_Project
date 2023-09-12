const Sequelize = require('sequelize');

// initializing the database
const sequeqlize = new Sequelize('foodcart','root','ANANd#2021',{

    dialect:'mysql',
    logging:false,
}    ) ;

module.exports = sequeqlize;

