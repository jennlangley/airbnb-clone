'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-01-01',
        endDate: '2023-01-04'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2023-02-01',
        endDate: '2023-02-04'
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2023-03-01',
        endDate: '2023-03-04'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {  [Op.in]: [1, 2, 3] }
    }, {});
  }
};
