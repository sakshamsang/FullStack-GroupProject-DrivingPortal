const Appointment = require("../models/appointment");
const User = require("../models/user");

const G2Page = async function (req, res) {
    const body = {
        date: new Date().toISOString().split('T')[0],
        isTimeSlotAvailable: true
    }
    const slots = await Appointment.find(body);
    const id = req.session.userId;
    const userType = req.session.userType;
    req.session.userId = id;
    req.session.userType = userType;
    let slotBody = [];
    slots.forEach(row => {
        let time = row.time.replace(":", "_");
        slotBody.push({
            time:"time_" + time,
            label:row.time
        })
    })
    const user = await User.findById(id);
    res.render('g2page', { user:user , slots:slotBody, date: body.date });
}

module.exports = G2Page;