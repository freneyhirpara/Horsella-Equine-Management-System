const getEventTypesDb = require('../../../utilities/db/journal/getEventTypes');

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'QUERY_ERR':
      status = 500;
      message = 'Error in executing query';
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

const getEventTypes = (req, resp) => {
  try {
    getEventTypesDb()
      .then((eventResp) => {
        if (eventResp) {
          resp.status(200).json({
            status: 200,
            data: eventResp,
            error: null,
          });
        }
      })
      .catch((err) => {
        returnError(err, resp);
      })
  } catch (err) {
    returnError(err, resp);
  }
};

module.exports = getEventTypes;
