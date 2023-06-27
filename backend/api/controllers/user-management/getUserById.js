const errCodes = require('../../../error-codes');
const getUser = require('../../../utilities/db/user/getUserById');

const returnError = (err, resp) => {
  let status;
  let message;
  switch (err.message) {
    case 'INV_USER_ID':
      status = 400;
      message = errCodes.INV_USER_ID;
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

const getUserById = (req, resp) => {
  try {
    const { id } = req.params;
    getUser(id)
      .then((user) => {
        resp.status(200).json({
          status: 200,
          data: user,
          error: null,
        });
      })
      .catch((err) => {
        returnError(err, resp);
      });
  } catch (err) {
    returnError(err, resp);
  }
};

module.exports = getUserById;
