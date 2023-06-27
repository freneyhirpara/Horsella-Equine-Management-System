const validator = require('validator');
const getHorseGenders = require('../../../../utilities/db/horse/horse-utils/getAllHorseGenders');

const returnError = (err, resp) => {
  resp.status(500).json({
    status: 500,
    error: {
      message: err.message,
    },
    data: null,
  });
};

const getAllHorseGenders = async (req, resp) => {
  try {
    getHorseGenders()
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

module.exports = getAllHorseGenders;
