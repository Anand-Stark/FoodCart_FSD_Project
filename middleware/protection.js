

module.exports  = (req,res,next) =>{
     console.log(!req.session.user);
     console.log(req.session.isAdminLoggedIn);
      if(!req.session.user && !req.session.admin){
          return res.redirect('/auth-login');
      }
      
      next();
  }


  