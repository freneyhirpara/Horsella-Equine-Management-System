const runQuery = require('../dbconn');

const deleteBreedingCenter = async (centerId) => new Promise((resolve, reject) => {
  const query = `UPDATE breeding_centers SET is_active = false WHERE id = ${centerId}`;
  runQuery(query)
    .then((result) => {
      if (result != null && result.rowCount === 1) {
        resolve();
      } else {
        reject(new Error('QUERY_ERR'));
      }
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = deleteBreedingCenter;
