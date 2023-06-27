const getAllEventsDb = require('../../../utilities/db/journal/getAllEvents');

const returnError = (err, resp) => {
  const status = 400;
  const { message } = err;
  resp.status(status).json({
    status,
    error: {
      message,
    },
    data: null,
  });
};

const getAllEvents = (req, resp) => {
  try {
    getAllEventsDb(req.userId)
      .then((getResp) => {
        if (getResp) {
          resp.status(200).json({
            status: 200,
            data: getResp,
            error: null,
          });
        } else {
          returnError(new Error('QUERY_ERR'), resp);
        }
      })
      .catch((err) => {
        returnError(err, resp);
      });
  } catch (err) {
    returnError(err, resp);
  }
};

module.exports = getAllEvents;
