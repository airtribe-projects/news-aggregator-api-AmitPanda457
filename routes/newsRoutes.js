const express = require('express');
const newsController = require('../controllers/newsController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/news', authenticateToken, newsController.getNews);

module.exports = router;
