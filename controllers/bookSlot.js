
const User = require("../models/user");
const Appointment = require("../models/appointment");

const BookSlot = async function (req, res) {
    const id = req.session.userId;
    const userType = req.session.userType;
    req.session.userId = id;
    req.session.userType = userType;
    const time = String(req.body.slot).substring(5).replace("_", ":");
    const slotBody = {
        date: req.body.date,
        time:time
    }
    const slot= await Appointment.findOne(slotBody);
    const slotupdate = await Appointment.findByIdAndUpdate(slot._id, {isTimeSlotAvailable:false}, { new: true });
    const user = await User.findByIdAndUpdate(id, {slot_id:slot._id,testType:req.body.testType}, { new: true });
    if(req.body.testType == "G2"){
        res.render('g2page', { success: "Booked slot succesfully!",
        user: user, slots:[], date: req.body.date } );
    }else{
        res.render('gpage', { success: "Booked slot succesfully!",
            user: user, slots:[], date: req.body.date } );
    }
};

module.exports = BookSlot;