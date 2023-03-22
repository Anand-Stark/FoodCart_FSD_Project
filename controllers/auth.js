
exports.getAuthenticationLogin = (req,res,next) =>{
     res.render('authentication/auth-login',{
          pageTitle:'Login/Signup',
          
     })
}

exports.getAuthenticationSignup = (req,res,next) =>{
    res.render('authentication/auth-signup',{
        pageTitle:'Login/Signup',

   })
}

exports.postAuthenticationLogin = (req,res,next) =>{
     console.log(req.authentication);
        req.authentication = true; 
        console.log(req.authentication);
     //    console.log(req.authentication)
        res.redirect('/');
}