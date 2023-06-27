const fetchAllUsers = require('../../../utilities/db/user/getAllUsers');

const returnError = (err, resp) => {
  resp.status(500).json({
    status: 500,
    error: {
      message: err.message,
    },
    data: null,
  });
};

const getAllUsers = async (req, resp) => {
  try {
    fetchAllUsers()
      .then((users) => {
        resp.status(200).json({
          status: 200,
          data: users,
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

module.exports = getAllUsers;
