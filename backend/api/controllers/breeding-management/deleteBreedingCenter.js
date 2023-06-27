const errorCodes = require('../../../error-codes');
const deleteBreedingCenterDb = require('../../../utilities/db/breeding/deleteBreedingCenter');
const checkIfBreedingCenterExists = require('../../../utilities/db/breeding/checkIfBreedingCenterExists');

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

const deleteBreedingCenter = async (req, resp) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (await checkIfBreedingCenterExists(id)) {
      deleteBreedingCenterDb(id)
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

module.exports = deleteBreedingCenter;
