const bcrypt = require('bcrypt');
const User = require('../models/user');
const Admin = require('../models/admin');
const Owner = require('../models/restaurantOwner');

exports.getLogin = (req,res,next) =>{
      // let message = req.flash('error');
      // if(message.length > 0){
      //       message = message[0];
      // } else{
      //        message = null;
      // }
       res.render('authentication/auth-login',{
             pageTitle:'User Login Page',
             adminPage:false,
             restaurantPage:false,
             path:'user'
       });

}

exports.getsignup = (req,res,next) =>{
     res.render('authentication/auth-signup',{
          pageTitle:'Signup Page',
          restaurantPage:false
     })
     
}

exports.postSignup = (req,res,next) =>{
      
     const userName = req.body.userName;
     const email = req.body.email;
     const password = req.body.password;
     const confirmPassword = req.body.confirmPassword;
    


   if(password === confirmPassword){
          
     User.findAll({where:{email:email}})
     .then(user =>{

          

         if(user.length !== 0){
          // console.log('12');
           return res.redirect('/auth-signup');

         }
         
         return bcrypt
                .hash(password,12)
                .then(hashedPassword =>{
                     return User.create({
                           userName:userName,
                           email:email,
                           password:hashedPassword
                      })
                })
                .then(user =>{
                          user.createCart();
                          res.redirect('/auth-login') ; 
                })

     })
     .catch(err =>{
        console.log(err);
     })

   }
   else{
       res.redirect('/auth-signup');
   }

    

}

exports.postLogin = (req,res,next) =>{
      const email = req.body.email;
      const password = req.body.password ; 

      console.log(password)

      User.findAll({where:{email:email}})
          .then(user =>{ 
                    // console.log(user[0].password)
                         bcrypt
                        .compare(password,user[0].password)
                        .then(value =>{
                           
                         // console.log(value)

                           if(value){
                               req.session.isLoggedIn =true;
                               req.session.user = user[0];
                               console.log(req.session.user.id);
                               return req.session.save(err =>{
                                    
                                    res.redirect('/');
                               })
                           }

                           res.redirect('/auth-login');
                        })
                        .catch(err => {
                         console.log(err);
                         res.redirect('/auth-login');
                       });
          })
          .catch(err =>{
                console.log(err);
          })
}

exports.postLogOut = (req,res,next) =>{
        req.session.destroy(err =>{
          
          // console loggig an error if there was any of it . 

          res.redirect('/auth-login');

        })
                   
}

// for authentication and getting the admin path
exports.getAdminLogin = (req,res,next) =>{
     const adminPage =true;
          res.render('authentication/auth-login',{
            pageTitle:'Admin Login',
            adminPage:adminPage,
            restaurantPage:false,
            path:'admin'
          })
   }

   exports.postAdminLogin = (req,res,next) =>{
       const email = req.body.email;
       const password = req.body.password;
       
       Admin.findAll({where:{
                email:email
           }})
            .then(admin =>{
                 if(!admin){
                    return res.redirect('/auth-admin-login');
                 }
                
                 req.session.isAdminLogged =true;
                 req.session.admin = admin[0];
                 console.log(req.session.admin);  
                 return req.session.save(err =>{
                                    
                    res.redirect('/');
               })
            })
            .catch(err =>{
                 console.log(err);
            })
       
   }

exports.getRestaurantLogin = (req,res,next) =>{
      const restaurantPage = true;
      res.render('authentication/auth-login',{
            pageTitle:'Owner Login',
            restaurantPage:restaurantPage,
            adminPage:false,
            path:'owner'
      })
}   

exports.postRestaurantLogin = (req,res,next) =>{
     const email = req.body.email;
     const password = req.body.password ; 

     // console.log(password)

     Owner.findAll({where:{email:email}})
         .then(owner =>{ 
               //     console.log(owner[0].password)
                        bcrypt
                       .compare(password,owner[0].password)
                       .then(value =>{
                          
                        console.log('value is' + value);

                          if(value){
                              req.session.isOwnerLoggedIn =true;
                              req.session.owner = owner[0];
                             
                              return req.session.save(err =>{
                                   
                                   res.redirect('/');
                              })
                          }

                          res.redirect('/auth-restaurant-login');
                       })
                       .catch(err => {
                        console.log(err);
                        res.redirect('/auth-restaurant-login');
                      });
         })
         .catch(err =>{
               console.log(err);
         })
}

exports.getRestaurantSignup = (req,res,next) =>{
        const restaurantPage = true;
        res.render('authentication/auth-signup',{
           pageTitle:'Restaurant Register',
           restaurantPage:restaurantPage
        })
}

exports.postRestaurantSignup = (req,res,next) =>{
       const email = req.body.email;
       const password = req.body.password;
       const confirmPassword = req.body.confirmPassword;
      
  
  
     if(password === confirmPassword){
            
       Owner.findAll({where:{email:email}})
       .then(owner =>{
  
            
  
           if(owner.length !== 0){
            // console.log('12');
             return res.redirect('/auth-restaurant-signup');
  
           }
           
           return bcrypt
                  .hash(password,12)
                  .then(hashedPassword =>{
                       return Owner.create({
                             email:email,
                             password:hashedPassword
                        })
                  })
                  .then(owner=>{
                         //    owner.createProduct();
                            res.redirect('/auth-restaurant-login') ; 
                  })
  
       })
       .catch(err =>{
          console.log(err);
       })
  
     }
     else{
         res.redirect('/auth-restaurant-signup');
     }
  
      
       
}