const runQuery = require('../../dbconn');

const getAllHorseGenders = () => new Promise((resolve, reject) => {
  const selectHorseGenderQuery = 'SELECT id, gender FROM horse_genders';
  runQuery(selectHorseGenderQuery)
    .then((response) => {
      resolve(response.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getAllHorseGenders;
