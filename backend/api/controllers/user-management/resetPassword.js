const validator = require('validator');
const errCodes = require('../../../error-codes');
const { comparePassword, encryptPassword } = require('../../../utilities/bcryptUtils');
const db = require('../../../utilities/db/user/resetPassword');

const user = {
  id: null,
  oldPass: null,
  email: null,
  newPassword: null,
};

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INV_REQ':
      message = errCodes.INV_REQ;
      break;
    case 'INV_NEW_PASS':
      message = errCodes.INV_NEW_PASS;
      break;
    case 'DATA_ERR':
      message = errCodes.DATA_ERR;
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

const validateCredentials = ({ newPass }) => {
  if (validator.isEmpty(newPass)) {
    throw new Error('INV_NEW_PASS');
  }
  if (comparePassword(newPass, user.oldPass)) {
    throw new Error('INV_NEW_PASS');
  }
  user.newPassword = encryptPassword(newPass);
};

const resetPassword = (req, resp) => {
  try {
    if (req.body === undefined || req.body === null) {
      throw new Error('DATA_ERR');
    } else {
      user.id = req.userId;
      user.oldPass = req.userPass;
      user.email = req.userEmail;
      db.getUserDetails(user.id)
        .then((userResp) => {
          if (user.email === userResp.email && user.oldPass === userResp.user_password) {
            validateCredentials(req.body);
            db.resetPassword(user.id, user.newPassword)
              .then((updateResp) => {
                if (updateResp) {
                  resp.status(204).send();
                } else {
                  returnError({ message: 'QUERY_ERR' }, resp);
                }
              })
              .catch((err) => {
                returnError(err, resp);
              });
          } else {
            returnError({ message: 'INV_REQ' }, resp);
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

module.exports = resetPassword;
