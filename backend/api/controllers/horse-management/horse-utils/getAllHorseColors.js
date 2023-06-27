const validator = require('validator');
const getHorseColors = require('../../../../utilities/db/horse/horse-utils/getAllHorseColors');

const returnError = (err, resp) => {
  resp.status(500).json({
    status: 500,
    error: {
      message: err.message,
    },
    data: null,
  });
};

const getAllHorseColors = async (req, resp) => {
  try {
    getHorseColors()
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

module.exports = getAllHorseColors;
