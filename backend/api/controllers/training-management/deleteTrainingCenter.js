const validator = require('validator');
const deleteTrainingCenterDb = require('../../../utilities/db/training/deleteTrainingCenter');
const checkIfTrainingCenterExists = require('../../../utilities/db/training/checkIfTrainingCenterExists');

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

const deleteTrainingCenter = async (req, resp) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (await checkIfTrainingCenterExists(id)) {
      deleteTrainingCenterDb(id)
        .then(() => {
          resp.status(204).send();
        })
        .catch((err) => {
          returnError(err, resp);
        });
    } else {
      returnError({ message: 'INV_CNTR_ID' }, resp);
    }
  } catch (err) {
    returnError(err, resp);
  }
};

module.exports = deleteTrainingCenter;
