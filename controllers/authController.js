const User = require('../models/User'); // Импорт модели пользователя

// Регистрация пользователя
exports.registerUser = async (req, res) => {
  try {
    const { username, password, firstName, lastName, age, gender } = req.body;

    // Проверка, что все поля заполнены
    if (!username || !password || !firstName || !lastName || !age || !gender) {
      return res.status(400).send('All fields are required');
    }

    // Проверка на существование пользователя
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Сохранение пользователя без хэширования (для тестирования)
    const newUser = new User({
      username,
      password, // Сохраняется в чистом виде
      firstName,
      lastName,
      age,
      gender,
    });

    await newUser.save(); // Сохранение в базе данных
    res.redirect('/auth/register-success'); // Перенаправление на страницу успешной регистрации
  } catch (err) {
    console.error('Ошибка при регистрации пользователя:', err);
    res.status(500).send('Error registering user');
  }
};

// Логин пользователя
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Найти пользователя по имени пользователя
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid username or password'); // Если пользователь не найден
    }

    // Сравнение пароля напрямую
    if (password !== user.password) {
      return res.status(401).send('Invalid username or password'); // Если пароль неверный
    }

    // Если логин успешен
    res.send('User logged in successfully');
  } catch (err) {
    console.error('Ошибка при входе пользователя:', err);
    res.status(500).send('Error logging in user');
  }
};
