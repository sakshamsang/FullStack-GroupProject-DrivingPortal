const User = require("../models/user");

const UpdateExaminer = async function (req, res) {
    const request = req.body;
    const body = {
        testStatus:request.testStatus,
        comments:request.comments  
    };
    const id = req.session.userId;
    const userType = req.session.userType;

    const user = await User.findByIdAndUpdate(req.body.userId, body, { new: true });
    req.session.userId = id;
    req.session.userType = userType;

    res.render('index', { success: "User updated successfully!", user });

}
module.exports = UpdateExaminer;