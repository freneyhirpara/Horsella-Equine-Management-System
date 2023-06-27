const validator = require('validator');
const errCodes = require('../../../error-codes');
const putHorse = require('../../../utilities/db/horse/updateHorse');

let horse = {
  id: null,
  horseName: null,
  ownerId: null,
  showName: null,
  genderId: null,
  breedId: null,
  colorId: null,
  disciplineId: null,
  microchipNumber: null,
  horseWeight: null,
  horseHeight: null,
  birthDate: null,
  father: null,
  mother: null,

};

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INV_HORSE_NAME':
      message = errCodes.INV_HORSE_NAME;
      break;
    case 'INV_SHOW_NAME':
      message = errCodes.INV_SHOW_NAME;
      break;
    case 'INV_GENDER_ID':
      message = errCodes.INV_GENDER_ID;
      break;
    case 'INV_COLOR_ID':
      message = errCodes.INV_COLOR_ID;
      break;
    case 'INV_BREED_ID':
      message = errCodes.INV_BREED_ID;
      break;
    case 'INV_DISCIPLINE_ID':
      message = errCodes.INV_DISCIPLINE_ID;
      break;
    case 'INV_MICROCHIP':
      message = errCodes.INV_MICROCHIP;
      break;
    case 'INV_HORSE_HEIGHT':
      message = errCodes.INV_HORSE_HEIGHT;
      break;
    case 'INV_HORSE_WEIGHT':
      message = errCodes.INV_HORSE_WEIGHT;
      break;
    case 'INV_HORSE_BDATE':
      message = errCodes.INV_HORSE_BDATE;
      break;
    case 'INV_HORSE_FNAME':
      message = errCodes.INV_HORSE_FNAME;
      break;
    case 'INV_HORSE_MNAME':
      message = errCodes.INV_HORSE_MNAME;
      break;
    case 'INV_OWNER_ID':
      message = errCodes.INV_OWNER_ID;
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
  horseName,
  showName = null,
  genderId,
  breedId,
  colorId,
  disciplineId,
  microchipNumber = null,
  horseWeight = null,
  horseHeight = null,
  birthDate,
  father = null,
  mother = null,

}) => {
  if (isNotString(horseName) || horseName.length < 2) {
    throw new Error('INV_HORSE_NAME');
  }
  if (
    showName !== null && (isNotString(showName) || showName.length < 3)) {
    throw new Error('INV_SHOW_NAME');
  }
  if (!validator.isInt(`${genderId}`)) {
    throw new Error('INV_GENDER_ID');
  }
  if (!validator.isInt(`${breedId}`)) {
    throw new Error('INV_BREED_ID');
  }
  if (!validator.isInt(`${colorId}`)) {
    throw new Error('INV_COLOR_ID');
  }
  if (!validator.isInt(`${disciplineId}`)) {
    throw new Error('INV_DISCIPLINE_ID');
  }
  if (microchipNumber !== null && !validator.isInt(microchipNumber)) {
    throw new Error('INV_MICROCHIP');
  }
  if (horseWeight !== null && !validator.isFloat(`${horseWeight}`)) {
    throw new Error('INV_HORSE_WEIGHT');
  }
  if (horseHeight !== null && !validator.isFloat(`${horseHeight}`)) {
    throw new Error('INV_HORSE_HEIGHT');
  }
  if (isNotString(birthDate)) {
    throw new Error('INV_BDATE');
  }
  if (
    father !== null && (isNotString(father) || father.length < 3)) {
    throw new Error('INV_FNAME');
  }
  if (
    mother !== null && (isNotString(mother) || mother.length < 3)) {
    throw new Error('INV_MNAME');
  }

  horse = {
    ...horse,
    horseName,
    showName,
    genderId,
    breedId,
    colorId,
    disciplineId,
    microchipNumber,
    horseWeight,
    horseHeight,
    birthDate,
    father,
    mother,
  };
};

const postHorse = async (req, resp) => {
  try {
    if (req.body === undefined || req.body === null) {
      throw new Error('DATA_ERR');
    } else {
      validateCredentials(req.body);
      horse.id = parseInt(req.params.id, 10);
      putHorse(horse)
        .then((values) => {
          resp.status(200).json({
            status: 200,
            data: {
              horseName: values.horse_name,
              ownerId: values.owner_id,
              showName: values.show_name,
              genderId: values.gender_id,
              breedId: values.breed_id,
              colorId: values.color_id,
              disciplineId: values.discipline_id,
              microchipNumber: values.microchip_number,
              horseWeight: values.horse_weight,
              horseHeight: values.horse_height,
              birthDate: values.birthdate,
              father: values.father,
              mother: values.mother,
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

module.exports = postHorse;
