const runQuery = require('../../dbconn');

const getAllHorseColors = () => new Promise((resolve, reject) => {
  const selectHorseColorQuery = 'SELECT id, color FROM horse_colors';
  runQuery(selectHorseColorQuery)
    .then((response) => {
      resolve(response.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getAllHorseColors;
