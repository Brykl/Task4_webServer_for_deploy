// включаем `CORS` для всех запросов
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/users/:id', (_, res) => {
  res.json({ msg: 'CORS включен для всех запросов!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`CORS-сервер запущен на порту ${PORT}`)
})

// включаем `CORS` для одного маршрута
app.get('/users/:id', cors(), (_, res) => {
  res.json({ msg: 'CORS включен только для этого маршрута!' })
})

// настраиваем `CORS`
const corsOptions = {
  origin: 'https://example.com',
  optionSuccessStatus: 200, // для старых браузеров и SmartTV
}

app.get('/users/:id', cors(corsOptions), (_, res) => {
  res.json({ msg: 'CORS включен только для example.com' })
})