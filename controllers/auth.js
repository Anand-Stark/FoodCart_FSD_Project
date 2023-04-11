const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getLogin = (req,res,next) =>{
      // let message = req.flash('error');
      // if(message.length > 0){
      //       message = message[0];
      // } else{
      //        message = null;
      // }
       res.render('authentication/auth-login',{
             pageTitle:'Login Page'
       });
}

exports.getsignup = (req,res,next) =>{
     res.render('authentication/auth-signup',{
          pageTitle:'Signup Page'
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

          console.log(user);

         if(user.email === email){
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
                         //  user.createCart();
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
        
}