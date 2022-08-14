const Appointment = require("../models/appointment");

const GetAppointment = async function (req, res) {
        const id = req.session.userId;
        const userType = req.session.userType;
        req.session.userId = id;
        req.session.userType = userType;
        let searchDate = new Date().toISOString().split('T')[0];
        if(req.body && req.body.date){
         searchDate = req.body.date;
        }
        const slots = await Appointment.find({date: searchDate});
        const timeList = slots.map(slot => slot.time);
        const filteredSlots = ALL_SLOTS.filter(slot => !timeList.includes(slot.label));
        res.render('appointment', { user: { userType, _id: id },slots:filteredSlots,date:searchDate });
}

const ALL_SLOTS =  [
    { label: "9:00", id: "time_9_00" },
    { label: "9:30", id: "time_9_30" },
    { label: "10:00", id: "time_10_00" },
    { label: "10:30", id: "time_10_30" },
    { label: "11:00", id: "time_11_00" },
    { label: "11:30", id: "time_11_30" },
    { label: "12:00", id: "time_12_00" },
    { label: "12:30", id: "time_12_30" },
    { label: "13:00", id: "time_13_00" },
    { label: "13:30", id: "time_13_30" },
    { label: "14:00", id: "time_14_30" },
  ];
module.exports = GetAppointment;