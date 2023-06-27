const getAllHorsesBoughtByUserDb = require('../../../../utilities/db/horse/buying/getAllHorseBoughtByUser');

const returnError = (err, resp) => {
  resp.status(500).json({
    status: 500,
    error: {
      message: err.message,
    },
    data: null,
  });
};

const getAllHorseBoughtByUser = (req, resp) => {
  try {
    getAllHorsesBoughtByUserDb(req.userId)
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

module.exports = getAllHorseBoughtByUser;
