const express = require('express');
const { addTrain, getAvailability } = require('../controllers/trainController');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Add a new train (Admin only)
router.post('/add', authenticate, authorizeAdmin, addTrain);

// Get seat availability for a route
router.get('/availability', getAvailability);

module.exports = router;
