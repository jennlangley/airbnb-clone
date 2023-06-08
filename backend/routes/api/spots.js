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
        .isFloat({min: -90, max: 90})
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({min: -180, max: 180})
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

const validateQuery = [
    check('page')
        .isInt({min: 0})
        .withMessage('Page must be greater than or equal to 0')
        .optional({ nullable: true }),
    check('size')
        .isInt({min: 0})
        .withMessage('Size must be greater than or equal to 0')
        .optional({ nullable: true }),
    check('maxLat')
        .isFloat({min: -90, max: 90})
        .withMessage('Maximum latitude is invalid')
        .optional({ nullable: true }),
    check('minLat')
        .isFloat({min: -90, max: 90})
        .withMessage('Minimum latitude is invalid')
        .optional({ nullable: true }),
    check('maxLng')
        .isFloat({min: -180, max: 180})
        .withMessage('Maximum longitude is invalid')
        .optional({ nullable: true }),
    check('minLng')
        .isFloat({min: -180, max: 180})
        .withMessage('Maximum longitude is invalid')
        .optional({ nullable: true }),
    check('maxPrice')
        .isFloat({min: 0})
        .withMessage('Maximum price must be greater than or equal to 0')
        .optional({ nullable: true }),
    check('minPrice')
        .isFloat({min: 0})
        .withMessage('Minimum price must be greater than or equal to 0')
        .optional({ nullable: true }),
    handleValidationErrors
]

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
        if (previewImage.length) spot.dataValues.previewImage = previewImage[0].dataValues.url;
        else spot.dataValues.previewImage = "";
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
    spot.dataValues.numReviews = +reviews[0].dataValues.numReviews;
    spot.dataValues.avgStarRating = Math.round(10*(reviews[0].dataValues.avgStarRating))/10;
    const spotImages = await spot.getSpotImages();
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
            }],
        }],
        order: [[Review, 'createdAt', 'DESC']],
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
    const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });
    return res.json(spot);
});

// Get all Spots
router.get('', validateQuery, async (req, res) => {
    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;
    let pagination = {}
    if (!page) page = 0;
    if (!size) size = 20;
    page = parseInt(page);
    size = parseInt(size);
    if (page >= 0 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * page; 
    };
    const where = {}
    if (minLat && maxLat) where.lat = {[Op.gte]: minLat, [Op.lte]: maxLat};
    else if (minLat) where.lat = {[Op.gte]: minLat};
    else if (maxLat) where.lat = {[Op.lte]: maxLat};

    if (minLng && maxLng) where.lng = {[Op.gte]: minLng, [Op.lte]: maxLng};
    else if (minLng) where.lng = {[Op.gte]: minLng};
    else if (maxLng) where.lng = {[Op.lte]: maxLng};

    if (minPrice && maxPrice) where.price = {[Op.gte]: minPrice, [Op.lte]: maxPrice}
    else if (minPrice) where.price = {[Op.gte]: minPrice}
    else if (maxPrice) where.price = {[Op.lte]: maxPrice}
            
    const spots = await Spot.findAll({
        where: {
            [Op.and]: {...where}
        },
        ...pagination
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
        if (previewImage.length) spot.dataValues.previewImage = previewImage[0].dataValues.url;
        else spot.dataValues.previewImage = "";
    };
    const Spots = {
        Spots: spots,
        page: page,
        size: size
    }
    return res.json(Spots);
});

module.exports = router;