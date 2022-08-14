const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    licenseNumber: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: ''
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    car_details: {
        make: {
            type: String,
            default: ''
        },
        model: {
            type: String,
            default: ''
        },
        year: {
            type: Number,
            default: ''
        },
        platNumber: {
            type: String,
            default: ''
        },
    },
    slot_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Appointment'},
    testType: { type: String,  default: '' },
    comments: { type: String,  default: '' },
    testStatus: { type: String,  default: '' },
});

UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    });
})

// UserSchema.pre('save', function (next) {
//     const user = this;
//     bcrypt.hash(user.licenseNumber, 10, (error, hash) => {
//         user.licenseNumber = hash;
//         next();
//     });
// })

const User = mongoose.model("User", UserSchema);

module.exports = User;