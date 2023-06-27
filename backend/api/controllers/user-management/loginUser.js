const validator = require('validator');
const errCodes = require('../../../error-codes');
const getUserByEmail = require('../../../utilities/db/user/getUserByEmail');
const getUserRole = require('../../../utilities/db/user/getUserRole');
const { generateToken } = require('../../../utilities/jwtUtils');

let user = {
  id: null,
  email: null,
  password: null,
  role: null,
  token: null,
};

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INV_USER_EMAIL':
      message = errCodes.INV_USER_EMAIL;
      break;
    case 'INV_PASS':
      message = errCodes.INV_PASS;
      break;
    case 'QUERY_ERR':
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

const validateCredentials = ({ email, password }) => {
  // Checking email address
  if (validator.isEmail(email)) {
    // Checking if password is passed or not
    if (!validator.isEmpty(password)) {
      // Set global user object
      user = { ...user, email, password };
    } else {
      throw new Error('INV_PASS');
    }
  } else {
    throw new Error('INV_USER_EMAIL');
  }
};

const login = (req, resp) => {
  try {
    if (req.body === undefined || req.body === null) {
      throw new Error('DATA_ERR');
    } else {
      validateCredentials(req.body);
      getUserByEmail(user)
        .then((userCreds) => {
          if (userCreds) {
            user.id = userCreds.id;
            user.token = generateToken(user);
            getUserRole(user.id)
              .then((role) => {
                user.role = role;
                resp.status(200).json({
                  status: 200,
                  data: {
                    id: user.id,
                    // eslint-disable-next-line max-len
                    name: `${userCreds.first_name}${userCreds.middle_name ? ` ${userCreds.middle_name}` : ''} ${userCreds.last_name}`,
                    email: user.email,
                    role: user.role,
                    phone: userCreds.phone_number,
                    country: user.country,
                    token: user.token,
                    pass_changed: userCreds.pass_changed,
                  },
                  error: null,
                });
              })
              .catch((err) => {
                returnError(err, resp);
              });
          } else {
            throw new Error('INV_USER_EMAIL');
          }
        })
        .catch((err) => {
          returnError(err, resp);
        });
    }
  } catch (err) {
    returnError(err, resp);
  }
};

module.exports = login;
