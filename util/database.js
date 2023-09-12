const Sequelize = require('sequelize');

// initializing the database
const sequeqlize = new Sequelize('foodcart','root','220755',{

    dialect:'mysql',
    logging:false,
}    ) ;

module.exports = sequeqlize;

