const errCodes = require('../../../error-codes');
const deleteRaceById = require('../../../utilities/db/racing/deleteRace');

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INVALID_RACE_ID':
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

const deleteRace = async (req, resp) => {
  try {
    const raceId = parseInt(req.params.id, 10);
    deleteRaceById(raceId)
      .then((values) => {
        if (values === true) {
          resp.status(204).send();
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

module.exports = deleteRace;
