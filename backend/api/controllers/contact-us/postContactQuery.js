const validator = require('validator');
const errCodes = require('../../../error-codes');
const postContactQueryDB = require('../../../utilities/db/contact-us/postContactQuery');

let details = {
  username: null,
  email: null,
  subject: null,
  message: null,
};

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INV_USER_NAME':
      message = 'Invalid User name';
      break;
    case 'INV_EMAIL':
      message = errCodes.INV_EMAIL;
      break;
    case 'INV_SUBJECT':
      message = 'Either Subject is not a string or is too short';
      break;
    case 'INV_MESSAGE':
      message = 'Either Message is not a string or is too short';
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

const isNotString = (param) => typeof param !== 'string';

const validateCredentials = ({
  userName, email, subject, message,
}) => {
  if (isNotString(userName) || userName.length < 3) {
    throw new Error('INV_USER_NAME');
  }
  if (isNotString(email) || !validator.isEmail(email)) {
    throw new Error('INV_EMAIL');
  }
  if (isNotString(subject) || subject.length < 5) {
    throw new Error('INV_SUBJECT');
  }
  if (isNotString(message) || message.length < 10) {
    throw new Error('INV_MESSAGE');
  }
  details = {
    userName,
    email,
    subject,
    message,
  };
};

const postContactQuery = (req, resp) => {
  try {
    if (req.body !== null || req.body !== undefined) {
      validateCredentials(req.body);
      postContactQueryDB(details)
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
    }
  } catch (err) {
    returnError(err, resp);
  }
};

module.exports = postContactQuery;
