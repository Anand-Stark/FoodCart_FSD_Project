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
      // const ownerId = req.owner.id

       restaurant.create({
           restaurantName:name,
           imageUrl:imageUrl,
           location:location,
           employees:noEmployees,
           foodItemsVeg:foodItemsVeg,
           foodItemsNonVeg:foodItemsNonVeg,
          
       })
       .then(result =>{
          res.redirect('/restaurant/products');
       })
       .catch(err =>{
         console.log(err);
       })
      
    }

exports.getProducts =(req,res,next)=>{
        restaurant.findAll()
                  .then(restraunts =>{
                     if(restraunts.length > 0){
                      return res.render('restaurant/product',{
                             pageTitle:'Restaurants',
                             products:restraunts,
                               
                      })
                     }

                     return res.render('err404',{
                         pageTitle:'Error'
                     })
                     
                  })
                  .catch(err =>{
                     console.log(err);
                  })
}

exports.getEditProduct = (req,res,next)=>{
        const restaurantId = req.params.restaurantId;
        restaurant.findByPk(restaurantId)
                  .then(restaurant =>{
                        res.render('restaurant/edit-product',{
                              pageTitle:'Edit Your Restaurant',
                              restaurant:restaurant,
                                
                        })
                  })
                  .catch(err =>{
                     console.log(err);
                  })

}

exports.postEditProduct = (req,res,next)=>{
          const restaurantId = req.body.restaurantId;
          const updatedName = req.body.name;
          const updatedImg = req.body.imageUrl;
          const updatedLocation = req.body.location;
          const updatedEmpNo = req.body.employee;
          const updatedfoodItemsVeg = req.body.foodItemsVeg;
          const updatedfoodItemsNonVeg = req.body.foodItemsNonVeg;
          

          
          restaurant.findByPk(restaurantId)
                    .then(restaurant =>{
                         restaurant.restaurantName= updatedName;
                         restaurant.imageUrl = updatedImg;
                         restaurant.location = updatedLocation;
                         restaurant.employees = updatedEmpNo;
                         restaurant.foodItemsVeg = updatedfoodItemsVeg;
                         restaurant.foodItemsNonVeg = updatedfoodItemsNonVeg;

                         return restaurant.save();
                    })
                    .then(result =>{
                         res.redirect('/restaurant/products');
                    })
                    .catch(err =>{
                         console.log(err)
                    })
}

exports.postDeleteProduct = (req,res,next)=>{
     const restaurantId = req.body.restaurantId;

     restaurant.findByPk(restaurantId)
               .then(restaurant =>{
                   return restaurant.destroy();
               })
               .then(result =>{
                  console.log('Restaurant deleted successfully');
                  res.redirect('/restaurant/products');
               })
               .catch(err =>{
                  console.log(err);
               })
}