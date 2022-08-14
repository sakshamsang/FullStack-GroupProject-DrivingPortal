const createUserValidation = (req, res, next) => {
    const body = req.body;
    if (!body.userName || !body.password || !body.repeatPassword || !body.userType) {
        return res.render('login', { signUpError: 'Please enter all Values' });
    } else if (body.password != body.repeatPassword) {
        return res.render('login', { signUpError: 'Password did not match' });
    }
    next()
}
module.exports = createUserValidation;