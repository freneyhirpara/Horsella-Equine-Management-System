const getAllSellingHorsesDb = require('../../../../utilities/db/horse/selling/getAllSellingHorse');

const returnError = (err, resp) => {
  resp.status(500).json({
    status: 500,
    error: {
      message: err.message,
    },
    data: null,
  });
};

const getAllSellingHorses = (req, resp) => {
  try {
    getAllSellingHorsesDb()
      .then((result) => {
        resp.status(200).json({
          status: 200,
          data: result,
          error: null,
        });
      })
      .catch((err) => {
        returnError(err, resp);
      });
  } catch (err) {
    returnError(err, resp);
  }
};

module.exports = getAllSellingHorses;
