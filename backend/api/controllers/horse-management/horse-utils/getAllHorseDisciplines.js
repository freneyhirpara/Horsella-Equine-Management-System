const validator = require('validator');
const getHorseDisciplines = require('../../../../utilities/db/horse/horse-utils/getAllHorseDisciplines');

const returnError = (err, resp) => {
  resp.status(500).json({
    status: 500,
    error: {
      message: err.message,
    },
    data: null,
  });
};

const getAllHorseDisciplines = async (req, resp) => {
  try {
    getHorseDisciplines()
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

module.exports = getAllHorseDisciplines;
