
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController'); // Убедитесь, что пути и функции корректны

// Маршрут для регистрации (GET и POST)
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' }); // Рендер формы регистрации
});

router.post('/register', registerUser); // Передача данных из формы в контроллер

// Маршрут для входа (GET и POST)
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' }); // Рендер формы входа
});

router.post('/login', loginUser); // Передача данных для входа в контроллер

module.exports = router;