const errCodes = require('../../../error-codes');
const getParticipationByRace = require('../../../utilities/db/racing/getParticipationByRace');
const checkIfRaceExists = require('../../../utilities/db/racing/checkIfRaceExists');

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

const getParticipants = async (req, resp) => {
  try {
    const raceId = parseInt(req.params.id, 10);
    if (await checkIfRaceExists(raceId)) {
      getParticipationByRace(raceId)
        .then((results) => {
          resp.status(200).json({
            status: 200,
            data: results,
            error: null,
          });
        })
        .catch((err) => {
          returnError(err, resp);
        });
    } else {
      returnError({ message: 'INV_RACE_ID' }, resp);
    }
  } catch (err) {
    returnError(err, resp);
  }
};

module.exports = getParticipants;
