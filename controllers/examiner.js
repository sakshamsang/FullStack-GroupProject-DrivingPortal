
const User = require("../models/user");
const Appointment = require("../models/appointment");

const Examiner = async function (req, res) {
    const id = req.session.userId;
    const userType = req.session.userType;
    req.session.userId = id;
    req.session.userType = userType;
    const userList = await User.find()
    const output = [];
    for(let i =0; i < userList.length; i++){
        const user = userList[i];
        if(user.slot_id && !user.testStatus){
        const slot = await Appointment.findById(user.slot_id);
            output.push({
                _id:user._id,
                firstName:user.firstName,
                lastName:user.lastName,
                licenseNumber:user.licenseNumber,
                testType:user.testType,
                slot_date: slot.date,
                slot_time: slot.time
            })
        }
    }
    res.render('examiner', {
            user: {_id:id,userType:userType}, allUsers: output
    });
};

module.exports = Examiner;