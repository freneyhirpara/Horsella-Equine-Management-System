/* eslint-disable no-nested-ternary */
const validator = require('validator');
const errCodes = require('../../../error-codes');
const postParticipation = require('../../../utilities/db/racing/postParticipation');
const checkIfUserExists = require('../../../utilities/db/user/checkIfUserExists');
const checkIfHorseExists = require('../../../utilities/db/horse/checkIfHorseExists');
const checkIfRaceExists = require('../../../utilities/db/racing/checkIfRaceExists');
const checkIfHorseParticipated = require('../../../utilities/db/racing/checkIfHorseParticipated');

const details = {
  userId: null,
  raceId: null,
  horseId: null,
  riderName: null,
};

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INV_RACE_ID':
      message = errCodes.INV_RACE_ID;
      break;
    case 'INV_USER_ID':
      message = errCodes.INV_USER_ID;
      break;
    case 'INV_HORSE_ID':
      message = errCodes.INV_HORSE_ID;
      break;
    case 'INV_RIDER_NAME':
      message = errCodes.INV_RIDER_NAME;
      break;
    case 'INV_USER_PARTICIPATED':
      message = errCodes.INV_USER_PARTICIPATED;
      break;
    case 'QUERY_ERR':
      status = 500;
      message = errCodes.QUERY_ERR;
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
const registerParticipant = async (req, resp) => {
  try {
    if (req.body !== undefined || req.body !== null) {
      details.userId = req.userId;
      details.raceId = parseInt(req.params.id, 10);
      details.horseId = parseInt(req.body.horseId, 10);
      if (
        validator.isEmpty(req.body.riderName)
        || req.body.riderName.length < 3
      ) {
        throw new Error('INV_RIDER_NAME');
      }
      details.riderName = req.body.riderName;

      const promiseArray = [];
      promiseArray.push(checkIfUserExists(details.userId));
      promiseArray.push(checkIfRaceExists(details.raceId));
      promiseArray.push(checkIfHorseExists(details.horseId));
      promiseArray.push(checkIfHorseParticipated(details.raceId, details.userId));

      Promise.all(promiseArray).then((values) => {
        if (values[0] && values[1] && values[2] && values[3]) {
          postParticipation(details)
            .then((result) => {
              resp.status(201).json({
                status: 201,
                data: result,
                error: null,
              });
            })
            .catch((err) => {
              returnError(err, resp);
            });
        } else {
          const error = !values[0]
            ? 'INV_USER_ID'
            : !values[1]
              ? 'INV_RACE_ID'
              : !values[2]
                ? 'INV_HORSE_ID'
                : 'INV_USER_PARTICIPATED';
          returnError({ message: error }, resp);
        }
      });
    }
  } catch (err) {
    returnError(err, resp);
  }
};

module.exports = registerParticipant;
