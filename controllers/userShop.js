const Product = require('../models/productAdmin');
// const Cart = require('../models/cart');
const User = require('../models/user');

exports.userHomePage = (req,res,next)=>{
        
      Product.findAll()
             .then(products =>{
                  // console.log(req.authentication)
                  res.render('shop/userHome',{
                        pageTitle:'User Home Page',
                        products:products,
                        authentication:req.authentication
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
                     authentication:req.authentication
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
                  product:product
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
            
            if(product.cartItems.quantity <= 0){
                return product.cartItems.destroy();
            }

            if(product){
               const oldQuantity = product.cartItems.quantity;
              //  console.log(oldQuantity);
               newQuantity = oldQuantity - 1;
              
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