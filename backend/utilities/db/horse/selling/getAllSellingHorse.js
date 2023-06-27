const runQuery = require('../../dbconn');

const getAllSellingHorses = () => new Promise((resolve, reject) => {
  const query = 'SELECT id, user_id, horse_id, price FROM sales WHERE is_active = true';
  runQuery(query)
    .then((result) => {
      resolve(result.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getAllSellingHorses;
