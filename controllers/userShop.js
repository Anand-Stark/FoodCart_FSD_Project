const Product = require('../models/productAdmin');
// const Cart = require('../models/cart');
const Restaurant = require('../models/restaurant')
const User = require('../models/user');
const Feedback = require('../models/feedback');
const Products = require('../models/productAdmin')
const { Op } = require("sequelize");
const feedback = require('../models/feedback');

exports.userHomePage = (req,res,next)=>{
        
      Product.findAll({where:{rating:{
          [Op.gte]: 7.5}}})
             .then(products =>{
                  // console.log(req.authentication)
                  Feedback.findAll()
                          .then(feedbacks =>{
                              if(req.user){
                                   return res.render('shop/userHome',{
                                        pageTitle:'Home Page',
                                        products:products,
                                        feedbacks:feedbacks,
                                        userName:req.user.userName
                                   })
                              }
                              
                              var countRestaurants = 10 ;
                              var userCount = 100;
                              var productCount = 0;
                              Restaurant.count()
                                        .then(count =>{
                                              countRestaurants = countRestaurants  + count;

                                           User.count()
                                               .then(count =>{

                                                   userCount = userCount + count;
                                                   Products.count()
                                                           .then(count =>{
                                                               productCount = productCount + count;

                                                                res.render('shop/userHome',{
                                                                 pageTitle:'Admin Dashboard',
                                                                 userName:req.admin.adminName,
                                                                 restaurantCount:countRestaurants,
                                                                 userCount:userCount,
                                                                 productCount:productCount
                                                             })

                                                           })
                                               })
                                             
                                             })
                                             
                        
                  });
             })

      
}; 

exports.getCart =  (req,res,next) =>{
      
       req.user
          .getCart()
          .then(cart =>{
                return cart.getProducts()
           })
           .then(products =>{
               res.render('shop/myCart',{
                     pageTitle:'My Cart',
                     products:products,
                     userName:req.user.userName
               })
           })
        
}

exports.postCart = (req,res,next) =>{
     const prodId = req.body.productId;
     console.log('id is '+prodId);
     let updatedCart;
     let newQuantity = 1; 
     req.user
        .getCart()
        .then(cart =>{
           updatedCart = cart;
           return cart.getProducts({where:{id:prodId}});
        })
        .then(products =>{
          let product ;
             if(products.length > 0){
                 product = products[0];
             }

             if(product){
               const oldQuantity = product.cartItems.quantity;
                 newQuantity = oldQuantity + 1;
                 return product
             }

             return Product.findByPk(prodId);
        })
        .then(product =>{
           return updatedCart.addProduct(product, {
               through: { quantity: newQuantity }
             });
        })
        .then(result =>{
           res.redirect('/cart');
        })
        .catch(err =>
           console.log(err));
}

// creating a get route for the searched product : 
exports.getSearchProduct = (req,res,next) =>{
     
   //   going to find the product and then render the page
   
   const userSearch = req.user.search.trim();

   Product.findOne({where : {title : userSearch}})
          .then(product =>{
               if(!product){
                   return res.render('err404',{
                         pageTitle: 'Error 404'
                   })
               } 
               console.log(product);
               return res.render('shop/searchedProduct',{
                  pageTitle: 'Your Search',
                  product:product,
                  userName:req.user.userName
               })

          })
          .catch(err =>{
              throw new Error('No product Found');
          })


}

// creating post and get routes for the searched 
exports.postSearchProduct = (req,res,next) =>{
     const searchItem = req.body.searchItem.toLowerCase();

   //   if(req.user.search){
   //        req.user.search.destroy();
   //   }

     req.user.search = searchItem;

     req.user.save();



     res.redirect('/searched-product');
        
}

exports.postAddQuantity = (req,res,next) =>{
      const productId = req.body.prodId;
      let userCart;
      let newQuantity = 1;
      req.user
         .getCart()
         .then(cart =>{
              userCart = cart;
              return cart.getProducts({where:{id:productId}});
         })
         .then(products =>{
            let product;
              if(products.length > 0){
                 product = products[0];
              }

              if(product){
                const oldQuantity = product.cartItems.quantity;
                newQuantity = oldQuantity + 1;
                return product
              }

            
         })
         .then(product =>{
             return userCart.addProduct(product,{
               through: { quantity: newQuantity }
             })
         })
         .then(result =>{
             res.redirect('/cart');
         })
         .catch(err =>{
             console.log(err);
         })
}


exports.postDecreaseQuantity = (req,res,next) =>{
  
     const prodId = req.body.prodId;
     let userCart;
     let newQuantity =1;
     let newprice = 1;

     console.log(prodId);
  
     req.user
        .getCart()
        .then(cart =>{
           userCart = cart;
           return cart.getProducts({where:{id:prodId}})
        })
        .then(products =>{

           let product;

            if(products.length > 0){
                   product = products[0];
            }
            
            if(product.cartItems.quantity < 2){
                return product.cartItems.destroy();
            }

            if(product){
               const oldQuantity = product.cartItems.quantity;
               // const OldPrice = product.cartItems.price;
            
              //  console.log(oldQuantity);
               newQuantity = oldQuantity - 1;

               // newprice = OldPrice*newQuantity;

               return product;
            }
           
        
        })
        .then(product =>{
               console.log(newQuantity);
               if(!product){
                  return res.redirect('/cart');
               }


                return userCart.addProduct(product,{
                through: { quantity: newQuantity }
              })
             
        })
        .then(result =>{
            
            return  res.redirect('/cart');
        })
        .catch(err =>{
           console.log(err);
        })

}

exports.postDeleteCartProduct = (req,res,next) =>{
       
     // first we have to get the cart then destroy that particular product in it
     const prodId = req.body.prodId;

     req.user
        .getCart()
        .then(cart =>{
             return cart.getProducts({where:{id:prodId}})
        })
        .then(products =>{
               const product = products[0];
             return product.cartItems.destroy();
        })
        .then(result =>{
            console.log('Product removed from cart successfully');
            res.redirect('/cart');
        })
        .catch(err =>{
            console.log(err);
        })

}

exports.getNonVeg = (req,res,next) =>{
     Product.findAll({where:{foodCategory:'Non-Veg'}})
            .then(products =>{
                 return res.render('shop/nonVegFood',{
                      pageTitle:'Non Veg Food',
                      products:products,
                      userName:req.user.userName
                 });
            })
}
exports.getVeg = (req,res,next) =>{
   Product.findAll({where:{foodCategory:'Veg'}})
   .then(products =>{
        return res.render('shop/vegFood',{
             pageTitle:'Veg Food',
             products:products,
             userName:req.user.userName
        });
   })
}
exports.getItalian = (req,res,next) =>{
   Product.findAll({where:{foodCategory:'Italian'}})
            .then(products =>{
                 return res.render('shop/italianFood',{
                      pageTitle:'Italian Food',
                      products:products,
                      userName:req.user.userName
                 });
            })
}
exports.getChinese = (req,res,next) =>{
   Product.findAll({where:{foodCategory:'Chinese'}})
            .then(products =>{
                 return res.render('shop/chineseFood',{
                      pageTitle:'Chinese Food',
                      products:products,
                      userName:req.user.userName
                 });
            })
}

exports.postFeedback = (req, res, next) =>{

     const feedback = req.body.rate;
     req.user.feedback = feedback;

     req.user.save()
             .then(result =>{
     
                  res.redirect('/');
             })
             .catch(err =>{
                 console.log(err);
             })
     
     
     
}

exports.getFeedback = (req,res,next) =>{
       res.render('shop/feedbackPage',{
           pageTitle:'FeedBack Form',
           userName:req.user.userName
       })
}

exports.postUserFeedback = (req,res,next) =>{
       const userName = req.user.userName;
       const feedback = req.body.feedback.trim();
       const rating = req.user.feedback;
       console.log(feedback);
       Feedback.create({
           userName:userName,
           text:feedback,
           ratingUser:rating
       })
       .then(result =>{
            console.log('feedback recieved');
            res.redirect('/');
       })
       .catch(err =>{
           console.log(err);
       })
}