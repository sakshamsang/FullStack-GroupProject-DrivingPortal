const Appointment = require("../models/appointment");

const AppointmentSave = async function (req, res) {
    try {
        console.log(req.body)
        if (req.session && req.session.userId) {
            const id = req.session.userId;
            const userType = req.session.userType;
            req.session.userId = id;
            req.session.userType = userType;
            const body = getBody(req.body);
            let data = [];
            for(let i=0; i< body.length;i++){
                 const response = await Appointment.create(body[i]);
                 data.push(response)
            }
            console.log(data)
            res.render('index', { user: { userType, _id: id }, message: "Saved Successfully!" });;
            return;
        }
        res.render('index');
    }
    catch (e) {
        console.log(e)
    }
}

function getBody(request) {
    const date = request.date;
    let list = [];
    Object.keys(request).forEach(key => {
        if (key != 'date') {
            const time = String(key).substring(5).replace("_", ":");
            console.log(key, time)
            list.push({
                date: date,
                time: time
            })

        }
    });
    return list;

}

function checkValid(body) {
    // Appointment.findOne();
    return true;
}
module.exports = AppointmentSave;