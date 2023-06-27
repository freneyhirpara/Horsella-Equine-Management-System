const validator = require('validator');

const errCodes = require('../../../error-codes');
const postUser = require('../../../utilities/db/user/postUser');
const { encryptPassword } = require('../../../utilities/bcryptUtils');
const getUserByEmail = require('../../../utilities/db/user/getUserByEmail');
const mailer = require('../../../utilities/mailer');
// const passwordGenerator = require('../../../utilities/passwordGenerator');

let user = {
  id: null,
  firstname: null,
  middlename: null,
  lastname: null,
  email: null,
  phoneRegion: null,
  phoneNumber: null,
  country: null,
  role: null,
  password: null,
};

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INV_FIRST_NAME':
      message = errCodes.INV_FIRST_NAME;
      break;
    case 'INV_MIDDLE_NAME':
      message = errCodes.INV_MIDDLE_NAME;
      break;
    case 'INV_LAST_NAME':
      message = errCodes.INV_LAST_NAME;
      break;
    case 'INV_EMAIL':
      message = errCodes.INV_EMAIL;
      break;
    case 'INV_PASS':
      message = errCodes.INV_PASS;
      break;
    case 'INV_PHONE_REGION':
      message = errCodes.INV_PHONE_REGION;
      break;
    case 'INV_PHONE_NUMBER':
      message = errCodes.INV_PHONE_NUMBER;
      break;
    case 'INV_COUNTRY':
      message = errCodes.INV_COUNTRY;
      break;
    case 'INV_ROLE_ID':
      message = errCodes.INV_ROLE_ID;
      break;
    case 'INV_USER_ID':
      message = errCodes.INV_USER_ID;
      break;
    case 'USER_EXISTS':
      message = errCodes.USER_EXISTS;
      break;
    case 'QUERY_ERR':
      status = 500;
      message = errCodes.QUERY_ERR;
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
  firstname, middlename = null, lastname, email, phoneRegion = null,
  phoneNumber = null, country = null, role, password,
}) => {
  if (isNotString(firstname) || firstname.length < 3) {
    throw new Error('INV_FIRST_NAME');
  }
  if (middlename !== null && (isNotString(middlename) || middlename.length < 3)) {
    throw new Error('INV_MIDDLE_NAME');
  }
  if (isNotString(lastname) || lastname.length < 3) {
    throw new Error('INV_LAST_NAME');
  }
  if (isNotString(email) || !validator.isEmail(email)) {
    throw new Error('INV_EMAIL');
  }
  if (phoneRegion !== null
    && (isNotString(phoneRegion) || !validator.isIn(phoneRegion.toUpperCase(), ['IN', 'GB']))) {
    throw new Error('INV_PHONE_REGION');
  }
  if (phoneNumber !== null
    && (isNotString(phoneNumber)
    || (phoneRegion !== null
      ? !validator.isMobilePhone(phoneNumber, `en-${phoneRegion}`)
      : !validator.isMobilePhone(phoneNumber, 'en-IN')))) {
    throw new Error('INV_PHONE_NUMBER');
  }
  if (country !== null && (isNotString(country) || !validator.isIn(country.toLowerCase(), ['india']))) {
    throw new Error('INV_COUNTRY');
  }
  if (isNotString(role) || !validator.isInt(role, { min: 1, max: 5 })) {
    throw new Error('INV_ROLE_ID');
  }
  if (isNotString(password) || password.length < 8) {
    throw new Error('INV_PASS');
  }
  user = {
    firstname,
    middlename,
    lastname,
    email,
    phoneRegion,
    phoneNumber,
    country,
    role: parseInt(role, 10),
    password: encryptPassword(password),
  };
};

const registerUser = async (req, resp) => {
  try {
    if (req.body === undefined || req.body === null) {
      throw new Error('DATA_ERR');
    } else {
      validateCredentials(req.body);
      if (!await getUserByEmail({ email: user.email, password: req.body.password })) {
        postUser(user)
          .then((values) => {
            mailer.sendMail(values.first_name, values.email, req.body.password)
              .then((mailResp) => {
                if (mailResp.rejected.length === 0) {
                  resp.status(201).json({
                    status: 201,
                    data: {
                      id: values.id,
                      name: `${values.first_name}${
                        values.middle_name ? ` ${values.middle_name}` : ''
                      } ${values.last_name}`,
                      email: values.email,
                      phoneNumber: values.phone_number,
                      country: values.country,
                      role: values.role,
                    },
                    error: null,
                  });
                } else {
                  console.log(mailResp);
                }
              })
              .catch((err) => {
                returnError(err, resp);
              });
          })
          .catch((err) => {
            returnError(err, resp);
          });
      } else {
        throw new Error('USER_EXISTS');
      }
    }
  } catch (err) {
    console.error(err.message);
    returnError(err, resp);
  }
};

module.exports = registerUser;
