const getAllContactQueriesDb = require('../../../utilities/db/contact-us/getAllContactQueries');

const returnError = (err, resp) => {
  resp.status(500).json({
    status: 500,
    error: {
      message: err.message,
    },
    data: null,
  });
};

const getAllContactQueries = (req, resp) => {
  try {
    getAllContactQueriesDb()
      .then((result) => {
        resp.status(200).json({
          status: 200,
          data: result,
          error: null,
        });
      })
      .catch((err) => {
        returnError(err);
      });
  } catch (err) {
    returnError(err, resp);
  }
};

module.exports = getAllContactQueries;
