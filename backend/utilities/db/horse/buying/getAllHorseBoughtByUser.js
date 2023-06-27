const runQuery = require('../../dbconn');

const getAllHorsesBoughtByUser = (userId) => new Promise((resolve, reject) => {
  const query = `SELECT id, horse_id, price, bought_date, bought_from FROM purchases 
  WHERE user_id = ${userId} ORDER BY id ASC`;
  runQuery(query)
    .then((result) => {
      resolve(result.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getAllHorsesBoughtByUser;
