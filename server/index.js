const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/employee')

// const allowCors = fn => async (req, res) => {
//     res.setHeader('Access-Control-Allow-Credentials', true)
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     // another common pattern
//     // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//     res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//     )
// }

const app = express();
app.use(express.json());
app.use(cors());
// app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://treidernovezok:oxeCWhiIMuLJOWU2@cluster0.unzd9zf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/employees', async (req, res) => {
    try {
      const employees = await EmployeeModel.find(); // Получаем всех сотрудников из коллекции
      res.json(employees); // Отправляем данные обратно на клиентскую сторону
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/', (req, res) => {
    res.send("Hello World");
})


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
                res.json({ success: true, user: updatedUser});
            } else {
                res.json({ success: false, message: 'Incorrect password' });
            }
        } else {
            res.status(400).json({ success: false, message: 'invalid password or email address' });
            // res.status(400).json({ success: false, message: "No record exists" });
        }
    })
    .catch(error => {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: "Server error" });
    });
});


app.post('/register', (req, res) => {
    const { email, login } = req.body;

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



app.listen(3001, () => {
    console.log('server is running on 3001');
});
