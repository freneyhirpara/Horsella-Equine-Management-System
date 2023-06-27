const validator = require('validator');
const { encryptPassword } = require('../../../utilities/bcryptUtils');
const checkIfUserExists = require('../../../utilities/db/user/checkIfUserExists');
const patchUser = require('../../../utilities/db/user/updateUser');

let updatedUser = {
  id: null,
  first_name: null,
  middle_name: null,
  last_name: null,
  email_id: null,
  phone_region: null,
  phone_number: null,
  country: null,
  role: null,
};

const returnError = (err, resp) => {
  // TODO Switch case for respective error types
  resp.status(400).json({
    status: 400,
    error: {
      message: err.message,
    },
    data: null,
  });
};

const isNotString = (param) => typeof param !== 'string';

const validateCredentials = (id, {
  firstname = null, middlename = null, lastname = null, email = null, phoneRegion = null,
  phoneNumber = null, country = null, role = null, password = null,
}) => {
  if (id == null || !validator.isInt(id)) {
    throw new Error('INV_USER_ID');
  }
  if (firstname !== null && (isNotString(firstname) || firstname.length < 3)) {
    throw new Error('INV_FIRST_NAME');
  }
  if (middlename !== null && (isNotString(middlename) || middlename.length < 3)) {
    throw new Error('INV_MIDDLE_NAME');
  }
  if (lastname !== null && (isNotString(lastname) || lastname.length < 3)) {
    throw new Error('INV_LAST_NAME');
  }
  if (email !== null && (isNotString(email) || !validator.isEmail(email))) {
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
  if (password !== null && (isNotString(password) || password.length < 8)) {
    throw new Error('INV_PASS');
  }

  updatedUser = {
    id,
    firstname,
    middlename,
    lastname,
    email,
    phoneRegion,
    phoneNumber,
    country,
    role: parseInt(role, 10),
    password: password == null ? null : encryptPassword(password),
  };
};

const updateUser = async (req, resp) => {
  try {
    if (req.body === undefined || req.body === null) {
      throw new Error('DATA_ERR');
    } else {
      validateCredentials(req.params.id, req.body);
      if (await checkIfUserExists(updatedUser.id)) {
        patchUser(updatedUser)
          .then((values) => {
            resp.status(200).json({
              status: 200,
              data: {
                name: `${values.first_name}${values.middle_name ? ` ${values.middle_name}` : ''} ${values.last_name}`,
                email: values.email,
                phoneNumber: values.phone_number,
                country: values.country,
                role: values.role,
              },
              error: null,
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

module.exports = updateUser;
