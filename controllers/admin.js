const Product = require("../models/productAdmin");
const mongo = require("mongodb");
const mongoose = require("mongoose");
const restaurant = require('../models/restaurant');
// just for animation

//    ---------------------------------------

exports.getAddProduct = (req, res, next) => {
  
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    authentication:req.authentication
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const rating = req.body.rating;
  const description = req.body.description;
  const category = req.body.categoryName;

  console.log(category);

  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    rating: rating,
    description: description,
    userId: req.user.id,
    foodCategory : category
  })
    .then((result) => {
      console.log("product saved successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// for showing all the admin products on a particaular page

exports.getProducts = (req, res, next) => {
  //   here , we will try to get all the possible products
  Product.findAll()
    .then((products) => {
      res.render("admin/product", {
        pageTitle: "Admin Product Page",
        products: products,
        authentication:req.authentication
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((product) => {
      res.render("admin/edit-product", {
        product: product,
        pageTitle: "Edit Products",
        authentication:req.authentication
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const updatedTitle = req.body.title;
  const updatedimageUrl = req.body.imageUrl;
  const updatedprice = req.body.price;
  const updatedrating = req.body.rating;
  const updateddescription = req.body.description;
  const prodId = req.body.productId.trim();

  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.imageUrl = updatedimageUrl;
      product.price = updatedprice;
      product.rating = updatedrating;
      product.description = updateddescription;

      // method for deleting the given product
      return product.save();
    })
    .then((result) => {
      res.redirect("/admin/products");
      console.log("Product Updated Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then((result) => {
      console.log("Product deleted successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.getRestraunts = (req,res,next) =>{
    
       restaurant.findAll()
                 .then(restaurants =>{
                     res.render('admin/collabRestaurants',{
                        pageTitle:'Collaborated Restarants',
                        products:restaurants,
                        authentication:req.authentication
                     })
                 })
}