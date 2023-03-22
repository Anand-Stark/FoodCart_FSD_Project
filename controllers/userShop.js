const Product = require('../models/productAdmin');
// const Cart = require('../models/cart');

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