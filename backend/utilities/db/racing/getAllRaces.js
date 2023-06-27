const runQuery = require('../dbconn');

const getRaces = () => new Promise((resolve, reject) => {
  const selectRaceQuery = `select * from races where is_cancelled = '${false}'`;
  runQuery(selectRaceQuery)
    .then((response) => {
      resolve(response.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getRaces;
