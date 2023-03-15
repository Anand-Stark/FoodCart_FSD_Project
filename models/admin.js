const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Admin = sequelize.define('admin',{
      id:{
         type:Sequelize.INTEGER,
         allowNull:false,
         autoIncrement:true,
         primaryKey:true
      },
      adminName :{
          type:Sequelize.STRING,
          allowNull:false
      },
      email:{
         type:Sequelize.STRING,
         allowNull:false
      }
});

module.exports = Admin;