'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Spot.scope('booking'), {foreignKey: 'spotId'});
      Booking.belongsTo(models.User, {foreignKey: 'userId'});
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Booking',
    scopes: {
      notOwner: {
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"]
        }
      },
    }
  });
  return Booking;
};