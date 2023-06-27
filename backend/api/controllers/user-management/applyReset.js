const validator = require('validator');
const errCodes = require('../../../error-codes');
const { generateToken } = require('../../../utilities/jwtUtils');
const applyResetDb = require('../../../utilities/db/user/applyReset');
const { sendResetLink } = require('../../../utilities/mailer');

let email;

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'DATA_ERR':
      message = errCodes.DATA_ERR;
      break;
    case 'QUERY_ERR':
      message = errCodes.QUERY_ERR;
      break;
    case 'INV_USER_EMAIL':
      message = errCodes.INV_USER_EMAIL;
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

const applyReset = (req, resp) => {
  try {
    if (req.body === undefined || req.body === null) {
      throw new Error('DATA_ERR');
    } else if (validator.isEmail(req.body.email)) {
      email = req.body.email;
      applyResetDb(email)
        .then((resetResp) => {
          const token = generateToken(resetResp);
          const resetLink = `http://localhost:3000/resetpassword?_t=${token}`;
          sendResetLink(resetResp.email, resetLink)
            .then((mailResp) => {
              resp.status(200).json({
                status: 200,
                data: {
                  message: 'Mail has been sent to registered email id, if you didn\'t'
                  + ' receive the mail, please try again after some time.',
                },
                error: null,
              });
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

module.exports = applyReset;
