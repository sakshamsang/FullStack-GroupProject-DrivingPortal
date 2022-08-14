const User = require("../models/user");
const bcrypt = require('bcrypt');

const GetUser = async function (req, res) {
    const body = {
        userName: req.body.userName
    }
    const user = await User.findOne(body);
    if (user) {
        bcrypt.compare(req.body.password, user.password, (error, same) => {
            if (same) {
                let path = 'index';
                // if (user.userType == 'Driver') {
                //     path = 'g2page'; //user.licenseNumber ? 'gpage' : 
                // }
                    req.session.userId = user._id;
                    req.session.userType = user.userType;
                    res.render(path, { user });
            } else {
                res.render('login', { signInError: 'Invalid Credentials' });
            }
        })
    } else {
        res.render('login', { signInError: 'Invalid Credentials' });
    }
}

module.exports = GetUser;