const express = require('express');
const router = express.Router();
const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');
const { Op } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');

// Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const imageId = req.params.imageId;
    const image = await ReviewImage.scope('reviewScope').findOne({
        where: {id: imageId}
    });
    
    if (!image) {
        const err = new Error('Review Image couldn\'t be found');
        err.status = 404;
        err.message = 'Review Image couldn\'t be found';
        return next(err);
    };

    const review = await Review.findOne({
        where: {id: image.dataValues.reviewId}
    });

    if (user.id !== review.userId) {
        const err = new Error('Proper authorization required');
        err.status = 403;
        err.message = 'User must be review author';
        return next(err);
    };

    await image.destroy();

    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;