const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/users/preferences', authenticateToken, userController.getPreferences);
router.put('/users/preferences', authenticateToken, userController.updatePreferences);
router.get('/preferences', authenticateToken, userController.getPreferences);
router.put('/preferences', authenticateToken, userController.updatePreferences);

module.exports = router;
