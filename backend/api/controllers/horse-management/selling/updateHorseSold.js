const updateHorseSoldDb = require('../../../../utilities/db/horse/selling/updateHorseSold');

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INV_SALE_ID':
      message = 'Invalid Sale Id';
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

const updateHorseSold = (req, resp) => {
  try {
    const { userId } = req;
    const saleId = parseInt(req.params.saleId, 10);
    if (Number.isNaN(saleId)) {
      throw new Error('INV_SALE_ID');
    }
    updateHorseSoldDb({ saleId, userId })
      .then((result) => {
        resp.status(200).json({
          status: 200,
          data: result,
          error: null,
        });
      })
      .catch((err) => {
        returnError(err, resp);
      });
  } catch (err) {
    returnError(err, resp);
  }
};

module.exports = updateHorseSold;
