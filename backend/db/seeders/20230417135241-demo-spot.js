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
        address: '3970 Spencer St',
        city: 'Las Vegas',
        state: 'NV',
        country: 'United States',
        lat: '36.116750',
        lng: '-115.127340',
        name: 'Underground House',
        description: 'The Underground House is a luxury cold war-era home with over 15,000 square feet and comes complete with artificial trees, faux rocks, and life-like scenery which include hand painted murals with scenes from homes the original owner had around the world. The lights can be adjusted to imitate different times of the day and there are twinkling stars on the ceiling to imitate the night sky. This underground residence has a four-hole putting green, two hot tubs, a sauna, a dance floor, a bar, a barbecue, and swimming pool. The main house has two bedrooms and three bathrooms. There is also a casita. This exclusive private home over the years has hosted receptions, weddings, corporate meetings as well as been featured in film, television, and print​ media.',
        price: '229.00',
      },
      {
        ownerId: 2,
        address: '142 Park Rd',
        city: 'Pittsford',
        state: 'NY',
        country: 'United States',
        lat: '43.047850',
        lng: '-77.474590',
        name: 'Mushroom House',
        description: 'Mushroom House was built in 1972 by architect James Johnson. It consists of 80-ton concrete pods that are built into the side of a hill. There are no straight lines built into the structure, which gives the home an extremely organic feel, but must make it a pain to arrange furniture. Handmade, colorful tiles and groovy mahogany doors make this home a fabulously funky landmark. One of the most unique houses in America.',
        price: '150.00',     
      },
      {
        ownerId: 3,
        address: '16 E Arrellaga St',
        city: 'Santa Barbara',
        state: 'CA',
        country: 'United States',
        lat: '34.427500',
        lng: '-119.708950',
        name: 'Whale House',
        description: 'Built in 1978, this artful expression of one man\'s vision blends design, nature\'s beauty, and a clever sense of humor!  Inspired by the fanciful creations of renowned Architect Antonio Gaudi, Michael Carmichael (Architect and original owner/builder) let his imagination run wild.  The result, one of the most awe-inspiring, mind-boggling homes in America!  The story begins, "...and then, the whale swallowed the entire ship!" The rest is pure hand-made artisan and architectural genius!',
        price: '1057.00',  
      },
      {
        ownerId: 4,
        address: '45 Berryessa Way',
        city: 'Hillsborough',
        state: 'CA',
        country: 'United States',
        lat: '37.53079',
        lng: '-122.35916',
        name: 'Flintstone House',
        description: 'Located in the town of Hillsborough, California, this otherworldly house has attracted a fair amount of controversy over the years. Constructed in 1977 by architect William Nicholson, the property was bought by media mogul Florence Fang in 2017, who turned the already unusual house into a treasure trove of quirky furnishings and ornaments.',
        price: '359',  
      },
      {
        ownerId: 5,
        address: '115 Wilkins Rd',
        city: 'Fayetteville',
        state: 'GA',
        country: 'United States',
        lat: 33.50936,
        lng: -84.44103,
        name: 'Guitar House',
        description: 'That\'s right, the house is shaped like a guitar! But for good reason. The property was designed by country music star, Elvis Carden, back in 1986. What better way to celebrate his career than by building a house shaped like his favourite instrument? Complete with a curving body, long fret board and a headstock, the roof even features a bridge and a faux soundhole (formed from a circular skylight). The pad was Carden\'s home for many years, but it also acted as his muse...',
        price: '350',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {  [Op.in]: ['Underground House', 'Mushroom House', 'Whale House', 'Flintstone House', 'Guitar House'] }
    }, {});
  }
};
