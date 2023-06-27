const validator = require('validator');
const getBreedingCenterByIdDb = require('../../../utilities/db/breeding/getBreedingCenterById');

const returnError = (err, resp) => {
  let status;
  let message;
  switch (err.message) {
    case 'INV_CNTR_ID':
      status = 400;
      message = 'Invalid Center Id';
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

const getBreedingCenterById = async (req, resp) => {
  try {
    const centerId = parseInt(req.params.id, 10);
    getBreedingCenterByIdDb(centerId)
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
        returnError(err, resp);
      });
  } catch (err) {
    console.error(err.message);
    returnError(err, resp);
  }
};

module.exports = getBreedingCenterById;
