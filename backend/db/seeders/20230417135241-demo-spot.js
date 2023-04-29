'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Demo Rd',
        city: 'Demotown',
        state: 'CA',
        country: 'United States of America',
        lat: '23.33',
        lng: '11.11',
        name: 'Demolicious',
        description: 'The all exclusive, amazing demo house that of which has never been seen!',
        price: '234.98',
      },
      {
        ownerId: 2,
        address: '444 Fake Rd',
        city: 'Fakeville',
        state: 'NY',
        country: 'United States of America',
        lat: '50',
        lng: '120',
        name: 'Fake is Great',
        description: 'This amazing getaway is so unreal, it\'s fake!',
        price: '125.00',     
      },
      {
        ownerId: 3,
        address: '404 Not Real Rd',
        city: 'Las Vegas',
        state: 'NV',
        country: 'United States of America',
        lat: '32.44',
        lng: '56.21',
        name: 'The Dollhouse',
        description: 'The one and only replica house which you can\'t wait to not see!',
        price: '600.50',  
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {  [Op.in]: ['The Dollhouse', 'Fake is Great', 'Demolicious'] }
    }, {});
  }
};
