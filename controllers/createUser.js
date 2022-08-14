
const User = require("../models/user");

const CreateUser = async function (req, res) {
    const request = req.body;
    const duplicate = await User.findOne({ userName: request.userName });
    if (duplicate) {
        res.render('login', { signUpError: "User Name already exists!" });
    } else {
        const user = await User.create(request);
        res.render('login', { success: "User created successfully!" });
    }
};

module.exports = CreateUser;