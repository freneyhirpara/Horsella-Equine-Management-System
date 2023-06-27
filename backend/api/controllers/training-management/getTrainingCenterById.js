const validator = require('validator');
const getTrainingCenterByIdDb = require('../../../utilities/db/training/getTrainingCenterById');

const returnError = (err, resp) => {
  let status;
  let message;
  switch (err.message) {
    case 'INV_CNTR_ID':
      status = 400;
      message = 'Invalid Center Id';
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

const getTrainingCenterById = async (req, resp) => {
  try {
    const centerId = parseInt(req.params.id, 10);
    getTrainingCenterByIdDb(centerId)
      .then((values) => {
        if (values != null) {
          resp.status(200).json({
            status: 200,
            data: values,
            error: null,
          });
        } else {
          returnError({ message: 'INV_CNTR_ID' }, resp);
        }
      })
      .catch((err) => {
        console.error(err.message);
        returnError(err, resp);
      });
  } catch (err) {
    console.error(err.message);
    returnError(err, resp);
  }
};

module.exports = getTrainingCenterById;
