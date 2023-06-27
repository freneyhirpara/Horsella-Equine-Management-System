const validator = require('validator');
const errCodes = require('../../../error-codes');
const updateEventDb = require('../../../utilities/db/journal/updateEvent');

const event = {
  horseId: null,
  eventId: null,
  title: null,
  description: null,
  startDate: null,
  endDate: null,
};

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INV_USER_NAME':
      message = 'Invalid User name';
      break;
    case 'INV_EMAIL':
      message = errCodes.INV_EMAIL;
      break;
    case 'INV_SUBJECT':
      message = 'Either Subject is not a string or is too short';
      break;
    case 'INV_MESSAGE':
      message = 'Either Message is not a string or is too short';
      break;
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

const isNotString = (param) => typeof param !== 'string';

const validateCredentials = ({
  horseId,
  eventId,
  title,
  description,
  startDate,
  endDate,
}) => {
  if (isNotString(title) || title.length < 3) {
    throw new Error('INV_EVENT_TILE');
  }
  if (isNotString(description) || description.length < 10) {
    throw new Error('INV_EVENT_DESC');
  }
  if (new Date(startDate) > new Date(endDate)) {
    throw new Error('INV_DATE_RNG');
  }
  event.title = title;
  event.horseId = horseId;
  event.eventId = eventId;
  event.description = description;
  event.startDate = startDate;
  event.endDate = endDate;
};

const updateEvent = (req, resp) => {
  try {
    if (req.body !== null || req.body !== undefined) {
      validateCredentials(req.body);
      const id = parseInt(req.params.id, 10);
      updateEventDb(id, event)
        .then((postResp) => {
          if (postResp) {
            resp.status(201).json({
              status: 201,
              data: postResp,
              error: null,
            });
          } else {
            returnError(new Error('QUERY_ERR'), resp);
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

module.exports = updateEvent;
