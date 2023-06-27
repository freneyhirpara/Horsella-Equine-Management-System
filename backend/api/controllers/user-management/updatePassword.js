const validator = require('validator');
const errCodes = require('../../../error-codes');
const getUserByEmail = require('../../../utilities/db/user/getUserByEmail');
const getUserRole = require('../../../utilities/db/user/getUserRole');
const updatePassword = require('../../../utilities/db/user/updatePassword');
const { generateToken } = require('../../../utilities/jwtUtils');

const user = {
  id: null,
  oldPassword: null,
  newPassword: null,
};

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INV_OLD_PASS':
      message = errCodes.INV_OLD_PASS;
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

const validateCredentials = ({ oldPass, newPass }) => {
  if (validator.isEmpty(oldPass)) {
    throw new Error('INV_OLD_PASS');
  }
  if (validator.isEmpty(newPass)) {
    throw new Error('INV_NEW_PASS');
  }
  if (oldPass.toLowerCase() === newPass.toLowerCase()) {
    throw new Error('INV_NEW_PASS');
  }
  user.oldPassword = oldPass;
  user.newPassword = newPass;
};

const changePassword = (req, resp) => {
  try {
    if (req.body === undefined || req.body === null) {
      throw new Error('DATA_ERR');
    } else {
      user.id = req.userId;
      validateCredentials(req.body);
      updatePassword({ ...user })
        .then((updateResp) => {
          if (updateResp) {
            resp.status(204).send();
          } else {
            throw new Error('QUERY_ERR');
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

module.exports = changePassword;
