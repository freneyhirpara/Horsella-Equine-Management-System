const deleteEventDb = require('../../../utilities/db/journal/deleteEvent');

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

const deleteEvent = (req, resp) => {
  try {
    const eventId = parseInt(req.params.id, 10);
    deleteEventDb(eventId)
      .then((getResp) => {
        if (getResp) {
          resp.status(204).send();
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

module.exports = deleteEvent;
