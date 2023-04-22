const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Owner = sequelize.define('owner',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
     },
     email:{
        type:Sequelize.STRING
     },
     password:{
         type:Sequelize.STRING
     }
});

module.exports = Owner;
