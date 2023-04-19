const express = require('express');
const router = express.Router();
const { Spot, User, Review, ReviewImage } = require('../../db/models');
const { Op } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const userId = user.id;
    const reviews = await Review.findAll({
        where: {userId: userId},
        include: [{model: User}, {model: Spot}, {model: ReviewImage}]
    });
    return res.json({Reviews: reviews});
});


module.exports = router;