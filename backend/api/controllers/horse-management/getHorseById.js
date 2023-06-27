const errCodes = require('../../../error-codes');
const getHorseByIdDb = require('../../../utilities/db/horse/getHorseById');

const returnError = (err, resp) => {
  let status;
  let message;
  switch (err.message) {
    case 'INV_HORSE_ID':
      status = 400;
      message = errCodes.INV_HORSE_ID;
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

const getHorseById = async (req, resp) => {
  try {
    const id = parseInt(req.params.id, 10);
    getHorseByIdDb(id)
      .then((values) => {
        resp.status(200).json({
          status: 200,
          data: values,
          error: null,
        });
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

module.exports = getHorseById;
