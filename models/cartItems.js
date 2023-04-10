const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const cartItemModel = sequelize.define('cartItems',{
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
      },
      quantity:Sequelize.INTEGER,
      price:Sequelize.INTEGER
})

module.exports = cartItemModel ; 