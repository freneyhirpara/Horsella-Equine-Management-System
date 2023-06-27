const runQuery = require('../../dbconn');

const registerHorseForSale = ({ userId, horseId, price }) => new Promise((resolve, reject) => {
  const query = `INSERT INTO sales (user_id, horse_id, price, created_at, updated_at) 
  VALUES (${userId}, ${horseId}, ${price}, '${new Date().toISOString()}', '${new Date().toISOString()}')
  RETURNING id, user_id, horse_id, price, is_active, sale_date, sold_to`;
  runQuery(query)
    .then((result) => {
      if (result.rowCount === 1) {
        resolve(result.rows[0]);
      }
      reject(new Error('QUERY_ERR'));
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = registerHorseForSale;
