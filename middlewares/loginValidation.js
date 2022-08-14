const loginValidation = (req, res, next) => {
    const body = req.body;
    if (!body.userName || !body.password) {
        return res.render('login', { signInError: 'Please enter all Values' });
    }
    next()
}
module.exports = loginValidation;