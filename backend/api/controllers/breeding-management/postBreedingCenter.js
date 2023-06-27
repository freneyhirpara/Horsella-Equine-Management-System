const validator = require('validator');
const errCodes = require('../../../error-codes');
const CreateBreedingCenter = require('../../../utilities/db/breeding/postBreedingCenter');

let breedingCenter = {
  id: null,
  centerName: null,
  ownerName: null,
  description: null,
  workingHours: null,
  experience: null,
  contact: null,
  email: null,
  address: null,
  website: null,
  imagePath: null,
};

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INV_CNTR_NAME':
      message = errCodes.INV_CNTR_NAME;
      break;
    case 'INV_OWNER_NAME':
      message = errCodes.INV_OWNER_ID;
      break;
    case 'INV_DESC':
      message = errCodes.INV_DESC;
      break;
    case 'INV_EMAIL':
      message = errCodes.INV_EMAIL;
      break;
    case 'INV_EXP':
      message = errCodes.INV_EXP;
      break;
    case 'INV_ADDR':
      message = errCodes.INV_ADDR;
      break;
    case 'INV_URL':
      message = errCodes.INV_URL;
      break;
    case 'INV_WORKING_HRS':
      message = errCodes.INV_WORKING_HRS;
      break;
    case 'INV_CONTACT_INFO':
      message = errCodes.INV_CONTACT_INFO;
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
  centerName,
  ownerName,
  description,
  workingHours = null,
  experience = null,
  contact,
  email,
  address,
  website = null,
}) => {
  if (isNotString(centerName) || centerName.length < 3) {
    throw new Error('INV_CNTR_NAME');
  }
  if (isNotString(ownerName) || ownerName.length < 3) {
    throw new Error('INV_OWNER_NAME');
  }
  if (isNotString(description) || description.length < 10) {
    throw new Error('INV_DESC');
  }
  if (isNotString(email) || !validator.isEmail(email)) {
    throw new Error('INV_EMAIL');
  }
  if (
    experience !== null
    && !validator.isInt(`${experience}`)
  ) {
    throw new Error('INV_EXP');
  }
  if (isNotString(address) || address.length < 10) {
    throw new Error('INV_ADDR');
  }
  if (website !== null && (isNotString(website) || website.length < 3)) {
    throw new Error('INV_URL');
  }
  if (
    workingHours !== null
    && (isNotString(workingHours) || workingHours.length < 3)
  ) {
    throw new Error('INV_WORKING_HRS');
  }

  if (isNotString(contact) || !validator.isMobilePhone(contact, 'en-IN')) {
    throw new Error('INV_CONTACT_INFO');
  }
  breedingCenter = {
    centerName,
    ownerName,
    description,
    workingHours,
    experience: parseInt(experience, 10),
    contact,
    email,
    address,
    website,
  };
};

const postbreedingCenter = async (req, resp) => {
  try {
    if (req.body === undefined || req.body === null || req.body === {}) {
      throw new Error('DATA_ERR');
    } else {
      validateCredentials(req.body);
      CreateBreedingCenter(breedingCenter)
        .then((values) => {
          resp.status(201).json({
            status: 201,
            data: {
              centerName: values.centerName,
              ownerName: values.ownerName,
              email: values.email,
              address: values.address,
            },
            error: null,
          });
        })
        .catch((err) => {
          returnError(err, resp);
        });
    }
  } catch (err) {
    console.error(err);
    returnError(err, resp);
  }
};

module.exports = postbreedingCenter;
