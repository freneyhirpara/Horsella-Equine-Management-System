const validator = require('validator');
const deleteHorseByIdDb = require('../../../utilities/db/horse/deleteHorse');

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INV_HORSE_ID':
      message = 'Invalid Horse Id';
      break;
    case 'QUERY_ERR':
      status = 500;
      message = 'Error in executing query';
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

const deleteHorse = async (req, resp) => {
  try {
    const id = parseInt(req.params.id, 10);
    deleteHorseByIdDb(id)
      .then((result) => {
        if (result) {
          resp.status(204).send();
        } else {
          returnError({ message: 'INV_HORSE_ID' }, resp);
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

module.exports = deleteHorse;
