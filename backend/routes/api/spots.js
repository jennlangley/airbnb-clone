const express = require('express');
const router = express.Router();
const { Spot, User } = require('../../db/models');
const { Op } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

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

router.get('/current', async (req, res) => {
    const { user } = req;
    const ownerId = user.id;
    const spots = await Spot.findAll({
        where: {ownerId: ownerId}
    });
    return res.json({Spots: spots});
})

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

router.post('', validateSpot, async (req, res) => {
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

router.get('', async (req, res) => {
    const allSpots = await Spot.findAll();
    return res.json(allSpots);
})

module.exports = router;