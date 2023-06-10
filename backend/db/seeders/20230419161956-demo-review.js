'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 2,
        review: 'The most magial place on earth',
        stars: 4
      },
      {
        userId: 1,
        spotId: 3,
        review: 'This place blew my socks off, in a bad way',
        stars: 1
      },
      {
        userId: 2,
        spotId: 1,
        review: 'Ruined my vacation',
        stars: 1
      },
      {
        userId: 2,
        spotId: 3,
        review: 'The perfect spot! Greatest stay I\'ve had',
        stars: 5
      },
      {
        userId: 3,
        spotId: 2,
        review: 'Smells bad but looks nice',
        stars: 2
      },
      {
        userId: 3,
        spotId: 1,
        review: 'Very great spot but there was rodent activity',
        stars: 4
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  }
};
