
exports.getAuthenticationLogin = (req,res,next) =>{
     res.render('authentication/auth-login',{
          pageTitle:'Login/Signup'
     })
}

exports.getAuthenticationSignup = (req,res,next) =>{
    res.render('authentication/auth-signup',{
        pageTitle:'Login/Signup'
   })
}
