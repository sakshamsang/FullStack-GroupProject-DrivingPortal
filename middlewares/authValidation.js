const AuthMiddleware = (req,res, next)=>{
    if(req.session && req.session.userId && req.session.userType == 'Driver'){
        next()
    }else{
        res.redirect('/login');
    }
}
module.exports = AuthMiddleware;