module.exports  = (req,res,next) =>{
     
    if(!req.session.user && !req.session.owner && !req.session.isAdminLogged){
        return res.redirect('/auth-login');
    }
    
    next();
}