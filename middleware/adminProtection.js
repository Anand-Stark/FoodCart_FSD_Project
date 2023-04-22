module.exports  = (req,res,next) =>{
     
    if(!req.session.isAdminLogged ){
        return res.redirect('/auth-login');
    }
    
    next();
}