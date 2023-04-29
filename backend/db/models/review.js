'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Spot.scope('booking'), {foreignKey: 'spotId'});
      Review.belongsTo(models.User.scope('reviewScope'), {foreignKey: 'userId'});
      Review.hasMany(models.ReviewImage, {foreignKey: 'reviewId', onDelete: 'CASCADE'});
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};