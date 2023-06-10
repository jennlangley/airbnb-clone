'use strict';
const bcrypt = require("bcryptjs")

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Jerry',
        lastName: 'Henderson',
        email: 'jhenderson@demo.io',
        username: 'jhenderson1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Marguerite',
        lastName: 'Antell',
        email: 'mantell@demo.io',
        username: 'marguerite2',
        hashedPassword: bcrypt.hashSync('password')        
      },
      {
        firstName: 'Michael',
        lastName: 'Carmichael',
        email: 'michaelmichael@demo.io',
        username: 'michaelx2',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Florence',
        lastName: 'Fang',
        email: 'ffang@demo.io',
        username: 'florence4',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Elvis',
        lastName: 'Carden',
        email: 'notTheElvis@demo.io',
        username: 'notTheElvis',
        hashedPassword: bcrypt.hashSync('password')
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options);
  }
};
