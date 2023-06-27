const runQuery = require('../../dbconn');

const getAllHorsesBought = () => new Promise((resolve, reject) => {
  const query = `SELECT id, user_id, horse_id, price, bought_date, bought_from FROM purchases
  ORDER BY id ASC`;
  runQuery(query)
    .then((result) => {
      resolve(result.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getAllHorsesBought;
