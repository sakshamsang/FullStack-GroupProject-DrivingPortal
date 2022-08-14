
const LogOut = function (req, res) {
    delete req.session.userId;
    delete req.session.userType;
    res.render('index');
}

module.exports = LogOut;