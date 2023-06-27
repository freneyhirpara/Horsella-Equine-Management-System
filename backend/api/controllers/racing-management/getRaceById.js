const validator = require('validator');
const errCodes = require('../../../error-codes');
const getRaceByIdDb = require('../../../utilities/db/racing/getRaceById');

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INV_RACE_ID':
      message = errCodes.INV_RACE_ID;
      break;
    default:
      status = 500;
      message = err.message;
  }
  resp.status(status).json({
    status,
    error: {
      message,
    },
    data: null,
  });
};

const getRaceById = async (req, resp) => {
  try {
    const raceId = parseInt(req.params.id, 10);
    getRaceByIdDb(raceId)
      .then((values) => {
        if (values != null) {
          resp.status(200).json({
            status: 200,
            data: values,
            error: null,
          });
        } else {
          returnError({ message: 'INV_RACE_ID' }, resp);
        }
      })
      .catch((err) => {
        console.error(err.message);
        returnError(err, resp);
      });
  } catch (err) {
    console.error(err.message);
    returnError(err, resp);
  }
};

module.exports = getRaceById;
