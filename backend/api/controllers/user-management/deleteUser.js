const errCodes = require('../../../error-codes');
const checkIfUserExists = require('../../../utilities/db/user/checkIfUserExists');
const deactivateUser = require('../../../utilities/db/user/deleteUser');

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INV_USER_ID':
      message = errCodes.INV_USER_ID;
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

const deleteUser = async (req, resp) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (await checkIfUserExists(id)) {
      deactivateUser(id)
        .then(() => {
          resp.status(204).send();
        })
        .catch((err) => {
          returnError(err, resp);
        });
    } else {
      returnError({ message: 'INV_USER_ID' }, resp);
    }
  } catch (err) {
    returnError(err, resp);
  }
};

module.exports = deleteUser;
