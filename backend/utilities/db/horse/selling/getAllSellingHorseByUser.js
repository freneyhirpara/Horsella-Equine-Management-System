const runQuery = require('../../dbconn');

const getAllSellingHorseByUser = (userId) => new Promise((resolve, reject) => {
  const query = `SELECT id, horse_id, price, sale_date, sold_to 
  FROM sales WHERE user_id = ${userId}`;
  runQuery(query)
    .then((result) => {
      resolve(result.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getAllSellingHorseByUser;
