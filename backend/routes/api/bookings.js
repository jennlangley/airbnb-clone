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
    const bookingId = +req.params.bookingId;
    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(bookingId);
    const currentDate = new Date().toJSON().slice(0, 10);
    if (!booking) {
        const err = new Error('Booking couldn\'t be found');
        err.status = 404;
        err.message = 'Booking couldn\'t be found';
        return next(err);
    };
    const spotId = booking.spotId;
    if (booking.userId !== userId) {
        const err = new Error('Proper authorization required');
        err.status = 403;
        err.message = 'Booking must belong to the current user';
        return next(err);
    };
    if (currentDate > startDate) {
        const err = new Error('Past bookings can\'t be modified');
        err.status = 400;
        err.message = 'Past bookings can\'t be modified';
        return next(err);
    };
    if (startDate >= endDate) {
        const err = new Error('Validation error');
        err.status = 400;
        err.message = 'endDate cannot be on or before startDate';
        return handleValidationErrors(next(err));
    };
    const alreadyBooked = await Booking.findAll({
        where: {
            spotId: spotId,
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
    if (alreadyBooked.length) {
        const err = new Error();
        err.status = 403;
        err.message = 'Sorry, this spot is already booked for the specified dates';
        return next(err);
    };
    const editedBooking = await booking.update({ startDate, endDate });
    return res.json(editedBooking);
});

// Delete a booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const userId = +user.id;
    const bookingId = +req.params.bookingId;
    const currentDate = new Date().toJSON().slice(0, 10);
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
        const err = new Error('Booking couldn\'t be found');
        err.status = 404;
        err.message = 'Booking couldn\'t be found';
        return next(err);
    };
    const spotId = booking.spotId;
    const spot = await Spot.findByPk(spotId);
    console.log("booking userId: ", booking.userId, "userId: ", user.id)
    if (currentDate > booking.startDate) {
        const err = new Error('Bookings that have been started can\'t be deleted');
        err.status = 400;
        err.message = 'Bookings that have been started can\'t be deleted';
        return next(err);
    };
    if (booking.userId === userId || spot.ownerId === userId) {
        await booking.destroy();
        return res.json({
            message: "Successfully deleted",
            statusCode: 200
        });
    };
    const err = new Error('Proper authorization required');
    err.status = 403;
    err.message = 'Booking or Spot must belong to the current user';
    return next(err);
});

module.exports = router;