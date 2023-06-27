const validator = require('validator');
const getHorsesByUserIdDb = require('../../../utilities/db/horse/getHorseByUserId');
const checkIfUserExists = require('../../../utilities/db/user/checkIfUserExists');

const returnError = (err, resp) => {
  resp.status(500).json({
    status: 500,
    error: {
      message: err.message,
    },
    data: null,
  });
};

const getAllHorsesByUserId = async (req, resp) => {
  try {
    getHorsesByUserIdDb(req.userId)
      .then((values) => {
        resp.status(200).json({
          status: 200,
          data: values,
          error: null,
        });
      })
      .catch((err) => {
        returnError(err, resp);
      });
  } catch (err) {
    console.error(err.message);
    returnError(err, resp);
  }
};

module.exports = getAllHorsesByUserId;
