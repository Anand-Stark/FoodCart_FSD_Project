const Product = require('../models/productAdmin');
const mongo = require('mongodb');
const mongoose  = require('mongoose')

// just for animation


//    ---------------------------------------



exports.getAddProduct = (req,res,next)=>{
    
     res.render('admin/add-product',{
          pageTitle:'Add Product'
     })
}

exports.postAddProduct = (req,res,next) =>{
     const title = req.body.title;
     const imageUrl = req.body.imageUrl;
     const price = req.body.price;
     const rating = req.body.rating;
     const description = req.body.description;
     // embedding the userId so as to later populate as needed
     const userId = req.user._id;
     

     const adminProduct = new Product({
          title:title,
          imageUrl:imageUrl,
          price:price,
          rating:rating,
          description:description,
          
          userId:userId
     })
     console.log(adminProduct);

     // mongoose method for saving the product:
     adminProduct.save()
                 .then(result =>{
                     console.log('Product saved successfully');
                     return res.redirect('/admin/products');
                 })
                 .catch(err =>{
                     console.log(err);
                 })
}

// for showing all the admin products on a particaular page

exports.getProducts = (req,res,next) =>{
     //   here , we will try to get all the possible products 
     const userId = req.user._id;
     Product.find({userId:userId})
            .then(products =>{
               res.render('admin/product',{
                    pageTitle:'Admin Product Page',
                    products:products
                })  
            })
            .catch(err =>{
               console.log(err);
            })
      

}

exports.getEditProduct = (req,res,next) =>{
       const prodId = req.params.productId;

       Product.findById({_id:prodId})
              .then(product =>{
                 res.render('admin/edit-product',{
                       product:product,
                       pageTitle:'Edit Products'
                 })
              })
              .catch(err =>{
                console.log(err);
              })
}

exports.postEditProduct = (req,res,next) =>{
     const updatedTitle = req.body.title;
     const updatedimageUrl = req.body.imageUrl;
     const updatedprice = req.body.price;
     const updatedrating = req.body.rating;
     const updateddescription = req.body.description;
     const userId = req.user._id;
     const prodId = req.body.productId.trim(); 
     Product.findById(prodId)
            .then(product =>{
               
               product.title = updatedTitle;
               product.imageUrl = updatedimageUrl;
               product.price = updatedprice;
               product.rating = updatedrating;
               product.description = updateddescription;
               product.userId = userId  ;
               
               return product.save();
            })
            .then(result =>{
                       res.redirect('/admin/products');
                       console.log("Product Updated Successfully");
                   })
                   .catch(err =>{
                     console.log(err);
                   })
                   
}

exports.postDeleteProduct = (req,res,next) =>{
     const prodId = req.body.productId;
     Product.deleteOne({_id:prodId})
            .then(result =>{
               console.log('Product deleted successfully');
               res.redirect('/admin/products');
            })
            .catch(err =>{
                console.log(err);
            })
}