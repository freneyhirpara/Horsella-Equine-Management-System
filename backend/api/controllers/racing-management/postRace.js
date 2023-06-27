const validator = require('validator');
const errCodes = require('../../../error-codes');
const CreateRace = require('../../../utilities/db/racing/postRace');

let newRace = {
  id: null,
  raceName: null,
  raceCourse: null,
  raceDate: null,
  raceLength: null,
  raceHorseAgeCriteria: null,
  raceHorseWeightCriteria: null,
};

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INV_RACE_NAME':
      message = errCodes.INV_RACE_NAME;
      break;
    case 'INV_COURSE_NAME':
      message = errCodes.INV_COURSE_NAME;
      break;
    case 'INV_RAC_LENGTH':
      message = errCodes.INV_RACE_LENGTH;
      break;
    case 'INV_AGE_CRITERIA':
      message = errCodes.INV_AGE_CRITERIA;
      break;
    case 'INV_WEIGHT_CRITERIA':
      message = errCodes.INV_WEIGHT_CRITERIA;
      break;
    case 'DATA_ERR':
      message = errCodes.DATA_ERR;
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

const isNotString = (param) => typeof param !== 'string';

const validateCredentials = ({
  id,
  raceName,
  raceCourse,
  raceDate,
  raceLength,
  raceHorseAgeCriteria,
  raceHorseWeightCriteria,
}) => {
  if (isNotString(raceName) || raceName.length < 3) {
    throw new Error('INV_RACE_NAME');
  }
  if (isNotString(raceCourse) || raceCourse.length < 3) {
    throw new Error('INV_COURSE_NAME');
  }
  if (!validator.isInt(`${raceLength}`)) {
    throw new Error('INV_RACE_LENGTH');
  }
  if (!validator.isInt(`${raceHorseAgeCriteria}`)) {
    throw new Error('INV_AGE_CRITERIA');
  }
  if (!validator.isInt(`${raceHorseWeightCriteria}`)) {
    throw new Error('INV_WEIGHT_CRITERIA');
  }
  newRace = {
    id,
    raceName,
    raceCourse,
    raceDate,
    raceLength,
    raceHorseAgeCriteria: parseInt(raceHorseAgeCriteria, 10),
    raceHorseWeightCriteria: parseInt(raceHorseWeightCriteria, 10),
  };
};

const postRace = async (req, resp) => {
  try {
    if (req.body === undefined || req.body === null) {
      throw new Error('DATA_ERR');
    } else {
      validateCredentials(req.body);
      CreateRace(newRace)
        .then((values) => {
          resp.status(201).json({
            status: 201,
            data: {
              id: values.id,
              raceName: values.raceName,
              raceCourse: values.raceCourse,
              raceDate: values.raceDate,
              raceHorseAgeCriteria: values.raceHorseAgeCriteria,
              raceHorseWeightCriteria: values.raceHorseWeightCriteria,
            },
            error: null,
          });
        })
        .catch((err) => {
          returnError(err, resp);
        });
    }
  } catch (err) {
    console.error(err.message);
    returnError(err, resp);
  }
};

module.exports = postRace;
