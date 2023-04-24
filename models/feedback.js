const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const feedback = sequelize.define('feedback',{
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
      },
      text:{
         type:Sequelize.STRING
      },
      userName:{
         type:Sequelize.STRING
      },
      ratingUser:{
          type:Sequelize.INTEGER
      }
})

module.exports = feedback ; 