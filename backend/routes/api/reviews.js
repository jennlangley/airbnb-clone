const express = require('express');
const router = express.Router();
const { Spot, User, Review, ReviewImage } = require('../../db/models');
const { Op } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');

// Get reviews of current user
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const userId = user.id;
    const reviews = await Review.findAll({
        where: {userId: userId},
        include: [{model: User}, {model: Spot}, {model: ReviewImage}]
    });
    return res.json({Reviews: reviews});
});

// Create an Image for a Review
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { user } = req;
    const userId = user.id;
    const { url } = req.body;

    const review = await Review.findOne({
        where: {id: +req.params.reviewId}
    });

    const reviewId = review.id;

    if (review.userId !== userId) {
        const err = new Error('Proper authorization required');
        err.status = 403;
        err.message = 'Review must belong to the current user';
        return next(err);
    };

    const image = await ReviewImage.create({reviewId, url});
    return res.json(image)
});

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const userId = user.id;

    const review = await Review.findOne({
        where: {id: req.params.reviewId}
    });

    if (!review) {
        const err = new Error('Review couldn\'t be found');
        err.status = 404;
        err.message = 'Review couldn\'t be found';
        return next(err);
    };

    if (review.userId !== userId) {
        const err = new Error('Proper authorization required');
        err.status = 403;
        err.message = 'Review must belong to the current user';
        return next(err);
    };

    await review.destroy();

    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;