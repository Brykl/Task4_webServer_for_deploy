const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    email: String,
    login: String,
    password: String,
    dateJoined: { type: String, default: '' },
    userStaus: { type: String, default: 'Availble' },
})

const EmployeeModel = mongoose.model("users", EmployeeSchema);
module.exports = EmployeeModel;