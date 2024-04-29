const mongoose = require('mongoose');

// Your MongoDB URI
const uri = "mongodb+srv://treidernovezok:nR7SlO4BPRxg0qxa@mymongodb.vshttet.mongodb.net/?retryWrites=true&w=majority&appName=mymongodb";

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const EmployeeSchema = new mongoose.Schema({
    email: String,
    login: String,
    password: String,
    dateJoined: { type: String, default: '' },
    userStatus: { type: String, default: 'Available' }, // Fixed typo here
});

const EmployeeModel = mongoose.model("usersForTask4", EmployeeSchema);
module.exports = EmployeeModel;
