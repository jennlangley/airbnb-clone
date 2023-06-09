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
        url: "https://img.atlasobscura.com/MwBikmplp2D6JXAkzeN8H6Ko6OIJ_2KEuII79U7fh3s/rt:fit/h:390/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy9jN2Jm/ZGRmYS04YWIwLTQ2/OTYtODkyZi0xOWZj/MDk2ZjUyMDdhNDZj/MTdhZDkxMjkwMjc0/OWNfTXFkWVBUUEEu/anBlZw.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://img.atlasobscura.com/N4aJPGV7G1sUS4bRq2qlt2G5tFDajCqrFopvnGeBkfg/rt:fit/h:390/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy85ZDM1/MDY3Mi0yZGQyLTQ3/MmEtYTA4Yi05MWMx/NjAxOTc1ZmQxOGJi/ZmY5OGZlYjhjNzE3/NTVfdThiQWR6eVEu/anBlZw.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://img.atlasobscura.com/cE6h6-VGtLlM1MnbqiWcv2hVwwAm0yTiNNzKaZXywFg/rt:fit/h:390/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy84ZTE4/ZWM2NS1kOWNkLTRh/ZGYtOTZmYy01MTdh/OWU0Mzk1MzMxOGJi/ZmY5OGZlYjhjNzE3/NTVfc25nRUNTOHcu/anBlZw.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://img.atlasobscura.com/cEXoBQ-ElRsgCMxljoKRfCDooI3MejBsd3xznYtCRu0/rt:fit/h:390/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy8yODI0/MTQ1My1jMGY0LTQw/MjgtOTE0Mi1lOGZk/OWRmYmZlY2JhNDZj/MTdhZDkxMjkwMjc0/OWNfVm9adWFycFEu/anBlZw.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://img.atlasobscura.com/Rh8RzCGyN9UUMG5x3619drJAWDlvio-LJBNbMzO9FhQ/rt:fit/w:1200/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy85ZWFl/ZWM5Ny0wNTkyLTQ4/ZGYtYjViMC03ZjZl/YjQ2NDFhNjExOGJi/ZmY5OGZlYjhjNzE3/NTVfMkJaelNWV0Eu/anBlZw.jpg",
        preview: false
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: {  [Op.in]: [1, 2, 3] }
    }, {});
  }
};
