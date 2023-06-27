const getAllSellingHorsesByUserDb = require('../../../../utilities/db/horse/selling/getAllSellingHorseByUser');
const checkIfUserExists = require('../../../../utilities/db/user/checkIfUserExists');

const returnError = (err, resp) => {
  resp.status(500).json({
    status: 500,
    error: {
      message: err.message,
    },
    data: null,
  });
};

const getAllSellingHorseByUser = async (req, resp) => {
  try {
    getAllSellingHorsesByUserDb(req.userId)
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

module.exports = getAllSellingHorseByUser;
