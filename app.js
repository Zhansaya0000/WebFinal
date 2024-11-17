const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');


dotenv.config();

const app = express();
app.use('/portfolio', portfolioRoutes);
app.use(express.static('public'));

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Установка EJS
app.set('view engine', 'ejs');

// Подключение маршрутов
app.use('/auth', authRoutes);

// Главная страница
app.get('/', (req, res) => {
  res.render('index', { title: 'Portfolio Platform' });
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
