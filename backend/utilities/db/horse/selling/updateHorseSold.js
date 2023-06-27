const runQuery = require('../../dbconn');

const updateHorseSold = ({ saleId, userId }) => new Promise((resolve, reject) => {
  const date = new Date();
  const query = `UPDATE sales 
  SET is_active = false, sale_date = '${date.getFullYear()}-${date.getMonth('MM')}-${date.getDate()}', 
  sold_to = ${userId}, updated_at = '${new Date().toISOString()}' WHERE id = ${saleId}
  RETURNING id, user_id, horse_id, price, sale_date, sold_to`;
  runQuery(query)
    .then((result) => {
      if (result.rowCount === 1) {
        const buyQuery = `INSERT INTO purchases (user_id, horse_id, price, bought_date, bought_from) 
        VALUES (${userId}, ${result.rows[0].horse_id}, 
          ${result.rows[0].price}, '${date.getFullYear()}-${date.getMonth('MM')}-${date.getDate()}', 
          ${result.rows[0].user_id}) 
        RETURNING id, user_id, horse_id, price, bought_date, bought_from`;
        runQuery(buyQuery)
          .then((buyResult) => {
            if (buyResult.rowCount === 1) {
              resolve({
                sale: result.rows[0],
                buy: buyResult.rows[0],
              });
            }
            reject(new Error('QUERY_ERR'));
          });
      }
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = updateHorseSold;
