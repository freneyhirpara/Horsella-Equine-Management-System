const validator = require('validator');
const getRaces = require('../../../utilities/db/racing/getAllRaces');

const returnError = (err, resp) => {
  resp.status(500).json({
    status: 500,
    error: {
      message: err.message,
    },
    data: null,
  });
};

const getAllRaces = async (req, resp) => {
  try {
    getRaces()
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

module.exports = getAllRaces;
