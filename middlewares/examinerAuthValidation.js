const ExaminerAuthMiddleware = (req,res, next)=>{
    if(req.session && req.session.userId && req.session.userType == 'Examiner'){
        next()
    }else{
        res.redirect('/login');
    }
}
module.exports = ExaminerAuthMiddleware;