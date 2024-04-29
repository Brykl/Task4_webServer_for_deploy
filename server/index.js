const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/employee');
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware для обработки CORS
app.use(cors());

// Подключение к базе данных MongoDB
mongoose.connect("mongodb+srv://treidernovezok:nR7SlO4BPRxg0qxa@mymongodb.vshttet.mongodb.net/mymongodb?retryWrites=true&w=majority");

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
    EmployeeModel.findOneAndUpdate(
        { email: email },
        { $set: { dateJoined: lastLogin } }, // Обновляем поле dateJoined с последним временем входа
        { new: true } // Устанавливаем new: true, чтобы получить обновленный документ
    )
    .then(updatedUser => {
        if (updatedUser) {
            if (updatedUser.password === password && updatedUser.userStaus === 'Availble') {
                res.status(200).json({ success: true, user: updatedUser});
            } else {
                res.status(400).json({ success: false, message: 'Incorrect password' });
            }
        } else {
            res.status(400).json({ success: false, message: 'invalid password or email address' });
        }
    })
    .catch(error => {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: "Server error" });
    });
});

// Роут для регистрации пользователя
app.post('/register', (req, res) => {
    const { email, login, password } = req.body;

    // Проверяем, существует ли пользователь с таким email
    EmployeeModel.findOne({ email: email })
    .then(existingUserByEmail => {
        EmployeeModel.findOne({ login: login })
            .then(existingUserByLogin => {
                if (existingUserByEmail) {
                    // Пользователь с таким email уже существует
                    res.status(400).json({ success: false, message: 'Email already exists' });
                } else if (existingUserByLogin) {
                    // Пользователь с таким логином уже существует
                    res.status(400).json({ success: false, message: 'Login already exists' });
                } else {
                    EmployeeModel.create(req.body);
                    res.status(200).json({ success: true, message: 'User created successfully' });
                }
            })
            .catch(err => {
                // Обработка ошибок запроса к базе данных для поиска по логину
                console.error("Ошибка при поиске пользователя по логину:", err);
                res.status(500).json({ success: false, message: 'Internal Server Error' });
            });
    })
    .catch(err => {
        // Обработка ошибок запроса к базе данных для поиска по email
        console.error("Ошибка при поиске пользователя по email:", err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    });
});

// Запуск сервера на порту 3001
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});



