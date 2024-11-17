const express = require('express');
const router = express.Router();
const {
  getPortfolio,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} = require('../controllers/portfolioController');

// Маршруты для CRUD операций
router.get('/', getPortfolio); // Отобразить все элементы портфолио
router.post('/add', createPortfolioItem); // Добавить новый элемент
router.post('/update/:id', updatePortfolioItem); // Обновить элемент
router.post('/delete/:id', deletePortfolioItem); // Удалить элемент

module.exports = router;
