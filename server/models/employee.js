const mongoose = require('mongoose');



const EmployeeSchema = new mongoose.Schema({
    email: String,
    login: String,
    password: String,
    dateJoined: { type: String, default: '' },
    userStatus: { type: String, default: 'Available' }, // Fixed typo here
});

const EmployeeModel = mongoose.model("usersForTask4", EmployeeSchema);
module.exports = EmployeeModel;
