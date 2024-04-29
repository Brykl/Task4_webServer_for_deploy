const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/employee');
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware для обработки CORS
app.use(cors());

// Подключение к базе данных MongoDB
mongoose.connect("mongodb+srv://treidernovezok:oxeCWhiIMuLJOWU2@cluster0.unzd9zf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
// Middleware для обработки JSON
app.use(express.json());

// Роут для получения всех сотрудников
// app.post('/employees', async (req, res) => {
//     try {
//       const employees = await EmployeeModel.find(); 
//       res.json(employees); 
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Server error' });
//     }
// });

// Роут для проверки соединения
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Роут для входа пользователя
app.post('/login', (req, res) => {
    const { email, password, lastLogin } = req.body;
            res.status(200).json({message: "there is email", email, password, lastLogin})
});

// Роут для регистрации пользователя
app.post('/register', (req, res) => {
    const { email, login, password } = req.body;

            EmployeeModel.create(req.body);
});

// Запуск сервера на порту 3001
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});



