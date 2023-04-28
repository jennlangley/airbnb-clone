const express = require('express');
const router = express.Router();
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { Op, ValidationError, and } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');

const validateSpot = [
    check ('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check ('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check ('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({checkFalsy: true})
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({checkFalsy: true})
        .withMessage('Description is required'),
    check('price')
        .exists({checkFalsy: true})
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReview = [
    check ('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check ('stars')
        .exists({ checkFalsy: true })
        .isInt({min: 1, max: 5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const ownerId = user.id;
    const spots = await Spot.findAll({
        where: {ownerId: ownerId},
    });
    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        const reviews = await spot.getReviews({
            attributes: [[sequelize.fn('AVG', sequelize.col("stars")), "avgRating"]],
        });
        spot.dataValues.avgRating = Math.round(10*(reviews[0].dataValues.avgRating))/10;
    };
    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        const previewImage = await spot.getSpotImages({
            where: {preview: true}
        });
        spot.dataValues.previewImage = previewImage[0].dataValues.url;
    };
    return res.json({Spots: spots});
})

// Create an image for a Spot
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { url, preview } = req.body;
    const ownerId = user.id;
    const spotId = +req.params.spotId;
    const spot = await Spot.findOne({
        where: {id: spotId},
        // attributes: [[Sequelize.fn('AVERAGE')]],
        // include: [{model: User, as: 'Owner'}]
    });
    if (!spot) {
        const err = new Error('Spot couldn\'t be found');
        err.status = 404;
        err.message = 'Spot couldn\'t be found';
        return next(err);
    };
    if (spot.ownerId !== ownerId) {
        const err = new Error('Proper authorization required');
        err.status = 403;
        err.message = 'Spot must belong to the current user';
        return next(err);
    };
    const image = await SpotImage.create({
        spotId, url, preview
    });
    const imageId = image.id;
    const spotImage = await SpotImage.scope('defaultScope').findOne({
        where: {id: imageId}
    });
    return res.json(spotImage);
})

// Create a Review for a Spot
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const { user } = req;
    const userId = user.id;
    const spotId = +req.params.spotId;
    const spot = await Spot.findOne({
        where: {id: spotId}
    });
    if (!spot) {
        const err = new Error('Spot couldn\'t be found');
        err.status = 404;
        err.message = 'Spot couldn\'t be found';
        return next(err);
    };
    const userReview = await Review.findOne({
        where: {userId: userId, spotId: spotId}
    });
    if (userReview) {
        const err = new Error('User already has a review for this spot');
        err.status = 403;
        err.message = 'User already has a review for this spot';
        return next(err);
    };
    const { review, stars } = req.body;
    const newReview = await Review.create({ userId, spotId, review, stars });
    return res.json(newReview);
});

// Create a booking based on a Spots id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { user } = req;
    const userId = user.id;
    const spotId = +req.params.spotId;
    const spot = await Spot.findOne({
        where: {id: spotId},
    });
    if (!spot) {
        const err = new Error('Spot couldn\'t be found');
        err.status = 404;
        err.message = 'Spot couldn\'t be found';
        return next(err);
    };
    if (spot.ownerId === userId) {
        const err = new Error('Proper authorization required');
        err.status = 403;
        err.message = 'Spot must NOT belong to the current user';
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
    const booking = await Booking.create({spotId, userId, startDate, endDate});
    return res.json(booking);
});

// Get all bookings for a Spot by id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { user } = req;
    const userId = user.id;
    const spotId = req.params.spotId;
    const spot = await Spot.findOne({
        where: {id: spotId},
    });
    if (!spot) {
        const err = new Error('Spot couldn\'t be found');
        err.status = 404;
        err.message = 'Spot couldn\'t be found';
        return next(err);
    };
    if (spot.ownerId === userId) {
        const bookings = await Booking.findAll({
            where: {spotId: spotId},
            include: {model: User.scope('reviewScope')}
        });
        return res.json({Bookings: bookings})
    } else {
        const bookings = await Booking.scope('notOwner').findAll({
            where: {spotId: spotId}
        });
        return res.json({Bookings: bookings})
    }

});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spotId = +req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        const err = new Error('Spot couldn\'t be found');
        err.status = 404;
        err.message = 'Spot couldn\'t be found';
        return next(err);
    };
    const reviews = await spot.getReviews({
        attributes: 
            [[sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating'], 
            [sequelize.fn('COUNT', sequelize.col('id')), 'numReviews']],
    });
    spot.dataValues.numReviews = reviews[0].dataValues.numReviews;
    spot.dataValues.avgStarRating = Math.round(10*(reviews[0].dataValues.avgStarRating))/10;
    const spotImages = await spot.getSpotImages();
    console.log(spotImages)
    spot.dataValues.SpotImages = spotImages;
    const owner = await spot.getOwner({
        attributes: ['id', 'firstName', 'lastName']
    });
    spot.dataValues.Owner = owner;
    return res.json(spot);
});

// Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const { user } = req;
    const ownerId = user.id;
    const spotId = +req.params.spotId;
    const spot = await Spot.findOne({
        where: {id: spotId},
    });
    if (!spot) {
        const err = new Error('Spot couldn\'t be found');
        err.status = 404;
        err.message = 'Spot couldn\'t be found';
        return next(err);
    };
    if (spot.ownerId !== ownerId) {
        const err = new Error('Proper authorization required');
        err.status = 403;
        err.message = 'Spot must belong to the current user';
        return next(err);
    };
    const { address, city, state, country, 
        lat, lng, name, description, price } = req.body;
    const editedSpot = await spot.update({ address, city, state, country, lat, lng, name, description, price });
    return res.json(editedSpot);
});

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const ownerId = user.id;
    const spotId = +req.params.spotId;
    const spot = await Spot.findOne({
        where: {id: spotId},
    });
    if (!spot) {
        const err = new Error('Spot couldn\'t be found');
        err.status = 404;
        err.message = 'Spot couldn\'t be found';
        return next(err);
    };
    if (spot.ownerId !== ownerId) {
        const err = new Error('Proper authorization required');
        err.status = 403;
        err.message = 'Spot must belong to the current user';
        return next(err);
    };
    await spot.destroy();
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
})

// Get Reviews by SpotId
router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findOne({
        where: {id: +req.params.spotId},
        include: [{
            model: Review, 
            include: [{model: User, 
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage
            }]
        }]
    });
    if (!spot) {
        const err = new Error('Spot couldn\'t be found');
        err.status = 404;
        err.message = 'Spot couldn\'t be found';
        return next(err);
    };
    return res.json({Reviews: spot.Reviews});
});

// Create a Spot
router.post('', requireAuth, validateSpot, async (req, res) => {
    const { user } = req;
    const ownerId = user.id;
    const { address, city, state, country, 
    lat, lng, name, description, price } = req.body;
    const latLng = `${lat}, ${lng}`;
    check('latLng')
        .isLatLong(latLng)
        .withMessage('Not a valid latitude longitude coordinate'),
        handleValidationErrors
    const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });
    return res.json(spot);
});

// Get all Spots
router.get('', async (req, res) => {
    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;
    let pagination = {}
    if (!page) query.page = 0;
    if (!size) query.size = 20;
    page = parseInt(page);
    size = parseInt(size);
    if (page >= 0 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * page; 
    };

    const spots = await Spot.findAll();
    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        const reviews = await spot.getReviews({
            attributes: [[sequelize.fn('AVG', sequelize.col("stars")), "avgRating"]],
        });
        spot.dataValues.avgRating = Math.round(10*(reviews[0].dataValues.avgRating))/10;
    };
    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        const previewImage = await spot.getSpotImages({
            where: {preview: true}
        });
        spot.dataValues.previewImage = previewImage[0].dataValues.url;
    };
    return res.json(spots);
});

module.exports = router;