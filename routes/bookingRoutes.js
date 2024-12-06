const express = require('express');
const { bookSeat, getBookingDetails } = require('../controllers/bookingController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Book a seat on a train
router.post('/book',authenticate, bookSeat);

// Get details of a specific booking by ID
router.get('/:id', authenticate, getBookingDetails);

module.exports = router;
