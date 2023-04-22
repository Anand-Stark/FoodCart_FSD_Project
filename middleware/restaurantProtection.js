module.exports  = (req,res,next) =>{
     console.log(req.session.owner);
    if(!req.session.owner){
        return res.redirect('/auth-login');
    }
    
    next();
}