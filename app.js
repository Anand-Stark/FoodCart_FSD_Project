const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');


// aquiring from all the routes
const userShop = require('./routes/shop');
const adminProducts = require('./routes/admin');
const vendorProducts = require('./routes/vendor');


// using mongoose for connecting databases :  
const mongoose = require('mongoose');
const mongodb= require('mongodb');

//Requiring all the models:
const Admin = require('./models/admin');
const User = require('./models/user');





app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine','ejs');
app.set('views','views');

// storing the newly made user and the admin in the req.user format in the body of the document . 

app.use((req,res,next)=>{
        User.findOne(new mongodb.ObjectId('6400a96670e0ce3872e2b078'))
            .then(user =>{
                   if(user){
                         req.user = user ;
                         next();
                   }

                   
            })
            .catch(err =>{
                   console.log(err);
            })})

app.use((req,res,next)=>{
      Admin.findOne(new mongodb.ObjectId('6400a96670e0ce3872e2b07b'))
      .then(admin =>{
            if(admin){
                  req.admin = admin ; 
                  next();
            }
      })
      .catch(err=>{
            console.log(err); 
      })
})            
        

             


// writing all the routes for getting the shop,admin and Vendors:

app.use('/admin', adminProducts);
app.use(userShop);
app.use('/vendor',vendorProducts);

mongoose.connect('mongodb+srv://tonysrule:jKLKh3bkD5pLbdDx@cluster0.fvc9sga.mongodb.net/foodCart?retryWrites=true&w=majority')
        .then(result =>{
            //if no user exists then create one
            User.findOne()
                .then(user =>{
                   if(!user){
                         user =new User({
                               userName:'Zeeshan',
                               email:'zee@123abc.in',
                               cart:{
                                     items:[]
                               }
                   })
                   
                  //  saving the created user
                  user.save();
            }
            
            // if no admin exits then create one
            Admin.findOne()
                 .then(admin =>{
                   if(!admin){
                         admin = new Admin({
                               adminName:'Anand',
                               email:'anand.s21@iiits.in',
                               adminCart:{
                                    items:[]
                               }
                         })
                   }
                   
                  //  saving the created admin
                   admin.save();
                 })
                 app.listen(3000,()=>{
                 console.log('Running on port number 3000 and database connected');
})
        })})
        .catch(err =>{
             console.log(err);
        })
