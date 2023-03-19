const restaurant = require('../models/restaurant')

exports.getAddProduct = (req,res,next)=>{
    
    // here we have to get the add product page 
    res.render('restaurant/add-product',{
         pageTitle:'Add Restaurant',
         
    })

}

exports.postAddProduct = (req,res,next)=>{
      const name = req.body.name;
      const imageUrl = req.body.imageUrl;
      const location = req.body.location;
      const noEmployees = req.body.employee;
      const foodItemsVeg = req.body.foodItemsVeg;
      const foodItemsNonVeg = req.body.foodItemsNonVeg;
      
       restaurant.create({
           restaurantName:name,
           imageUrl:imageUrl,
           location:location,
           employees:noEmployees,
           foodItemsVeg:foodItemsVeg,
           foodItemsNonVeg:foodItemsNonVeg
       })
       .then(result =>{
          res.redirect('/restaurant/products');
       })
       .catch(err =>{
         console.log(err);
       })
      
    }

exports.getProducts =(req,res,next)=>{
       
}

exports.getEditProduct = (req,res,next)=>{

}

exports.postEditProduct = (req,res,next)=>{

}

exports.postDeleteProduct = (req,res,next)=>{

}