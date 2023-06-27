const runQuery = require('../../dbconn');

const getAllHorseBreeds = () => new Promise((resolve, reject) => {
  const selectHorseBreedQuery = 'SELECT id, breed FROM horse_breeds';
  runQuery(selectHorseBreedQuery)
    .then((response) => {
      resolve(response.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getAllHorseBreeds;
