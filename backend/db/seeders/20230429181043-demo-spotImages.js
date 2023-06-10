'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://assets.cyllenius.com/media/tt-underground-house-vegasinc.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://na.rdcpix.com/a5d5d997a1e33f12a53d83005b34a529w-c3370287751rd-w832_h468_r4_q80.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.designboom.com/twitterimages/uploads/2020/06/underground-house-las-vegas-bunker-on-sale-18-million-designboom-fb.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://toptenrealestatedeals.com/wp-content/uploads/2019/06/wk_5c866b15f25d4.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.reviewjournal.com/wp-content/uploads/2018/03/10330296_web1_copy_underground-house_03-24-18_16.jpg?crop=1",
        preview: false
      },
      {
        spotId: 2,
        url: "https://img-aws.ehowcdn.com/700x/www.onlyinyourstate.com/wp-content/uploads/2016/04/Screen-Shot-2016-01-30-at-11.13.46-PM-700x390.png",
        preview: true
      },
      {
        spotId: 2,
        url: "https://img-aws.ehowcdn.com/700x/www.onlyinyourstate.com/wp-content/uploads/2016/04/Screen-Shot-2016-01-30-at-11.00.49-PM-700x390.png",
        preview: false
      },
      {
        spotId: 2,
        url: "https://img-aws.ehowcdn.com/700x/www.onlyinyourstate.com/wp-content/uploads/2016/04/Screen-Shot-2016-01-30-at-11.15.58-PM-700x390.png",
        preview: false
      },
      {
        spotId: 2,
        url: "https://images.squarespace-cdn.com/content/v1/5161c148e4b0b72aa94ded4d/1365663131547-HGJWI2P09QRGON5GV92C/patio2_1200.jpg?format=1500w",
        preview: false
      },
      {
        spotId: 2,
        url: "https://images.squarespace-cdn.com/content/v1/5161c148e4b0b72aa94ded4d/1365662137725-LY3979YMEP1NFF3IJPMO/_R3F4239small.jpg?format=1500w",
        preview: false
      },
      {
        spotId: 3,
        url: "https://i.pinimg.com/originals/5d/1f/4b/5d1f4b9477eec0fc205cd17c2505eaf8.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://i0.wp.com/www.thehamiltoncoblog.com/wp-content/uploads/2014/02/8.jpg?ssl=1",
        preview: false
      },
      {
        spotId: 3,
        url: "https://gallery.streamlinevrs.com/units-gallery/00/01/5E/image_149064798.jpeg",
        preview: false
      },
      {
        spotId: 4,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/2b781887-221f-47a2-b49e-2f8fb3bf6882-americas-weirdest-homes-flintstone-house-ext.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/c6214776-0302-42d0-a555-dba67919cf12-americas-weirdest-homes-flintstone-house.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/7963b4a9-db5a-4cee-b1eb-11f9691a72b1-americas-weirdest-homes-flintstone-house-lounge.jpg',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/9ae61b78-9e19-476f-a1fb-a302552ddbb1-americas-weirdest-homes-flintstone-house-kitchen.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/14371ed9-e400-4d01-9473-c834aa810ea6-weirdest-homes-in-america-guitar-house-ariel.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/396643f9-6097-4457-9db6-6ac8c1cf7cc1-weirdest-homes-in-america-guitar-house.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/de0bc2fd-7cc4-46d0-9559-84c8894adfd7-weirdest-homes-in-america-guitar-house-inside.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/cbcdc3d4-2ece-4eaa-939c-c471ba972b06-weirdest-homes-in-america-guitar-house-bedroom.jpg',
        preview: false
      }

    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options);
  }
};
