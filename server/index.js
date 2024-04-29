const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/employee');
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware для обработки CORS
app.use(cors());

// Подключение к базе данных MongoDB
mongoose.connect("mongodb+srv://treidernovezok:nR7SlO4BPRxg0qxa@mymongodb.vshttet.mongodb.net/?retryWrites=true&w=majority&appName=mymongodb");

// Middleware для обработки JSON
app.use(express.json());

// Роут для получения всех сотрудников
app.post('/employees', async (req, res) => {
    try {
      const employees = await EmployeeModel.find(); 
      res.json(employees); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
});

// Роут для проверки соединения
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Роут для входа пользователя
app.post('/login', (req, res) => {
    const { email, password, lastLogin } = req.body;
    EmployeeModel.findOne({email: email})
    .then(user =>{
        if(user)
        {
            res.status(200).json({message: "there is email"})
        }
       else {
        res.status(400).json({message: "there isn't email"})
       }
    }
    )

});

// Роут для регистрации пользователя
app.post('/register', (req, res) => {
    const { email, login, password } = req.body;
    EmployeeModel.findOne({email: email})
    .then(user =>{
        if(!user)
        {
            res.status(200).json({ success: true, message: 'User created successfully' });
            EmployeeModel.create(req.body);
        }
       else {
        res.status(400).json({message: "there is email"})
       }
    })


});

// Запуск сервера на порту 3001
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});



