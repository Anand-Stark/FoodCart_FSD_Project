const product = require('../models/productAdmin');

exports.userHomePage = (req,res,next)=>{
     
      product.findAll()
             .then(products =>{
                  res.render('shop/userHome',{
                        pageTitle:'User Home Page',
                        products:products
                  });
             })

     
}; 

exports.getCart =  (req,res,next) =>{
        res.render('shop/myCart',{
             pageTitle:'My Cart'
        })
}
