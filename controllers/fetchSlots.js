const Appointment = require("../models/appointment");
const User = require("../models/user");

const FetchSlots = async function (req, res) {
    const body = {
        date: req.body.date,
        isTimeSlotAvailable:true
    }
    const slots = await Appointment.find(body);
    const id = req.session.userId;
    const userType = req.session.userType;
    req.session.userId = id;
    req.session.userType = userType;
    const user = await User.findById(id);
    let slotBody = [];
    slots.forEach(row => {
        let time = row.time.replace(":", "_");
        slotBody.push({
            time:"time_" + time,
            label:row.time
        })
    })
    let path = "g2page";
    console.log(req.body)
    if(req.body.testType == "G"){
        path = "gpage";
    }
    res.render(path, { user, slots:slotBody, date: body.date  });
}

module.exports = FetchSlots;