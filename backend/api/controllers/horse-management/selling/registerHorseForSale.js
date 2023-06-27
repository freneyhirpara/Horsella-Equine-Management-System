const { default: validator } = require('validator');
const registerHorseForSaleDb = require('../../../../utilities/db/horse/selling/registerHorseForSale');

const details = {
  userId: null,
  horseId: null,
  price: null,
};

const returnError = (err, resp) => {
  let status = 400;
  let message;
  switch (err.message) {
    case 'INV_HORSE_ID':
      message = 'Invalid Horse Id';
      break;
    case 'INV_PRICE':
      message = 'Invalid Price';
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

const registerHorseForSale = (req, resp) => {
  try {
    details.userId = req.userId;
    const horseId = parseInt(req.params.horseId, 10);
    if (Number.isNaN(horseId)) {
      throw new Error('INV_HORSE_ID');
    }
    details.horseId = horseId;
    const price = parseFloat(req.params.price);
    if (Number.isNaN(price)) {
      throw new Error('INV_PRICE');
    }
    details.price = price;
    registerHorseForSaleDb(details)
      .then((result) => {
        resp.status(201).json({
          status: 201,
          data: result,
          error: null,
        });
      })
      .catch((err) => {
        returnError(err, resp);
      });
  } catch (err) {
    returnError(err);
  }
};

module.exports = registerHorseForSale;
