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
    return res.json(bookings);
});

// Edit a booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const userId = +user.id;
    const bookingId = +req.params.bookingId
    const booking = await Booking.findOne({
        where: {id: bookingId}  
    });
    if (!booking) {
        const err = new Error('Booking couldn\'t be found');
        err.status = 404;
        err.message = 'Booking couldn\'t be found';
        return next(err);
    };
    if (booking.userId !== userId) {
        const err = new Error('Proper authorization required');
        err.status = 403;
        err.message = 'Booking must belong to the current user';
        return next(err);
    };
    if (Date.now() > booking.endDate) {
        const err = new Error('Past bookings can\'t be modified');
        err.status = 400;
        err.message = 'Past bookings can\'t be modified';
        return next(err);
    };
    const { startDate, endDate } = req.body;
    if (startDate >= endDate) {
        const err = new Error('Validation error');
        err.status = 400;
        err.message = 'endDate cannot be on or before startDate';
        return handleValidationErrors(next(err));
    };
    const alreadyBooked = await Booking.findAll({
        where: {
            spodId: spotId,
            [Op.and]: {
                startDate: {
                    [Op.gte]: startDate
                }, 
                endDate: {
                    [Op.lte]: endDate
                }
            }
        }
    });
    if (alreadyBooked) {

    };
});

module.exports = router;