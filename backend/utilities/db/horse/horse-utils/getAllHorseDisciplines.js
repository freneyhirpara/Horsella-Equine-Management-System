const runQuery = require('../../dbconn');

const getHorseDisciplines = () => new Promise((resolve, reject) => {
  const selectHorseDisciplineQuery = 'SELECT id, discipline FROM horse_disciplines';
  runQuery(selectHorseDisciplineQuery)
    .then((response) => {
      resolve(response.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getHorseDisciplines;
