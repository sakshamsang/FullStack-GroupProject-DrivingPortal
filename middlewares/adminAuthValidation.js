const AdminAuthMiddleware = (req,res, next)=>{
    if(req.session && req.session.userId && req.session.userType == 'Admin'){
        next()
    }else{
        res.redirect('/login');
    }
}
module.exports = AdminAuthMiddleware;