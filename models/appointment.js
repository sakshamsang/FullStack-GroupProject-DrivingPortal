const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    date: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    },
    isTimeSlotAvailable: {
        type: Boolean,
        default: true
    },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;