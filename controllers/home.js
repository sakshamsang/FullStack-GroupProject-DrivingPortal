
const Home = function (req, res) {
    if (req.session && req.session.userId) {
        const id = req.session.userId;
        const userType = req.session.userType;
        req.session.userId = id;
        req.session.userType = userType;
        res.render('index', { user: { userType, _id: id } });;
        return;
    }
    res.render('index');
}

module.exports = Home;