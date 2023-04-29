'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    static associate(models) {
      ReviewImage.belongsTo(models.Review, {foreignKey: 'reviewId'});
    }
  }
  ReviewImage.init({
    reviewId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReviewImage',
    defaultScope: {
      attributes: {
        exclude: ['reviewId', 'updatedAt', 'createdAt']
      }
    },
    scopes: {
      reviewScope: {
        attributes: {
          exclude: ['updatedAt', 'createdAt']
        }
      }
    }
  });
  return ReviewImage;
};