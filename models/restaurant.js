const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const restaurantModel = sequelize.define('restaurant',{
   id:{
      type: Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false ,
      primaryKey:true
   },
    restaurantName:{
      type: Sequelize.STRING,
      allowNull:false
    },
    imageUrl:{type: Sequelize.STRING,
       allowNull:false},

      location:{
         type:Sequelize.STRING,
         allowNull:false
      },
      employees:{
          type:Sequelize.INTEGER,
          allowNull:false
      },
      foodItemsVeg:{
          type:Sequelize.INTEGER,
          allowNull:false
      },
      foodItemsNonVeg:{
         type:Sequelize.INTEGER,
         allowNull:false
      }
   }

);


module.exports = restaurantModel; 