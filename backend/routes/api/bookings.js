const express = require('express');
const router = express.Router();
const { Spot, User, Review, Booking, sequelize } = require('../../db/models');
const { Op } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');

// Get all current User's bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;
    const userId = +user.id;
    const bookings = await Booking.findAll({
        where: {userId: userId},
        include: {model: Spot.scope('booking')}
    });
    return res.json(bookings)
})



module.exports = router;