const getEventByIdDb = require('../../../utilities/db/journal/getEventById');

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

const getEventById = (req, resp) => {
  try {
    const eventId = parseInt(req.params.id, 10);
    getEventByIdDb(eventId)
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

module.exports = getEventById;
