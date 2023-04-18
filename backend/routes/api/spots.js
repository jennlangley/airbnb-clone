const express = require('express');
const router = express.Router();
const { Spot, User, SpotImage } = require('../../db/models');
const { Op } = require('sequelize');
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

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const ownerId = user.id;
    const spots = await Spot.findAll({
        where: {ownerId: ownerId},
        include: [{model: SpotImage}]
    });
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
        err.title = 'Spot couldn\'t be found';
        err.status = 404;
        err.message = 'Spot couldn\'t be found';
        return next(err);
    }
    if (spot.ownerId !== ownerId) {
        const err = new Error('Proper authorization required');
        err.title = 'User must be spot owner';
        err.status = 400;
        err.message = 'Spot must belong to the current user';
        return next(err);
    }
    const image = await SpotImage.create({
        spotId, url, preview
    });
    const imageId = image.id
    const spotImage = await SpotImage.scope('defaultScope').findOne({
        where: {id: imageId}
    });
    return res.json(spotImage)
})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId
    const spot = await Spot.findOne({
        where: {id: spotId},
        // attributes: [[Sequelize.fn('AVERAGE')]],
        include: [{model: User, as: 'Owner'}]
    })
    if (!spot) {
        const err = new Error('Spot couldn\'t be found');
        err.title = 'Spot couldn\'t be found';
        err.status = 404;
        err.message = 'Spot couldn\'t be found';
        return next(err);
    }
    return res.json(spot);
})

// Create a Spot
router.post('', requireAuth, validateSpot, async (req, res) => {
    const { user } = req;
    const ownerId = user.id;
    const { address, city, state, country, 
    lat, lng, name, description, price } = req.body;
    const latLng = `${lat}, ${lng}`;
    const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });
    return res.json(spot);
    // if (user) {

    // } else {
        
    // }
})

// Get all Spots
router.get('', async (req, res) => {
    const allSpots = await Spot.findAll();
    return res.json(allSpots);
})

module.exports = router;