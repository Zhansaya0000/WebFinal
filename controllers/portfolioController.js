const Portfolio = require('../models/Portfolio');

// Получение всех элементов портфолио
exports.getPortfolio = async (req, res) => {
  try {
    const portfolioItems = await Portfolio.find();
    res.render('portfolio', { title: 'Your Portfolio', portfolioItems });
  } catch (err) {
    console.error('Error fetching portfolio items:', err);
    res.status(500).send('Error fetching portfolio items');
  }
};

// Создание нового элемента портфолио
exports.createPortfolioItem = async (req, res) => {
  try {
    const { title, description, images } = req.body;
    const newPortfolioItem = new Portfolio({ title, description, images: images.split(',') });
    await newPortfolioItem.save();
    res.redirect('/portfolio');
  } catch (err) {
    console.error('Error creating portfolio item:', err);
    res.status(500).send('Error creating portfolio item');
  }
};

// Обновление элемента портфолио
exports.updatePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, images } = req.body;
    await Portfolio.findByIdAndUpdate(id, { title, description, images: images.split(','), updatedAt: Date.now() });
    res.redirect('/portfolio');
  } catch (err) {
    console.error('Error updating portfolio item:', err);
    res.status(500).send('Error updating portfolio item');
  }
};

// Удаление элемента портфолио
exports.deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Portfolio.findByIdAndDelete(id);
    res.redirect('/portfolio');
  } catch (err) {
    console.error('Error deleting portfolio item:', err);
    res.status(500).send('Error deleting portfolio item');
  }
};
