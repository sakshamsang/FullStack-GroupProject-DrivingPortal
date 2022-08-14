const User = require("../models/user");

const UpdateUser = async function (req, res) {
    const request = req.body;
    const body = getBody(request);
    const id = req.session.userId;

    const user = await User.findByIdAndUpdate(id, body, { new: true });
    req.session.userId = user._id;

    res.render('index', { success: "User updated successfully!", user });

}


function getBody(request) {
    return request.licenseNumber ? {
        firstName: request.firstName,
        lastName: request.lastName,
        licenseNumber: request.licenseNumber,
        age: request.age,
        car_details: {
            make: request.make,
            model: request.model,
            year: request.year,
            platNumber: request.platNumber
        }
    } : {
        car_details: {
            make: request.make,
            model: request.model,
            year: request.year,
            platNumber: request.platNumber
        }
    };
}
module.exports = UpdateUser;