const runQuery = require('../dbconn');

const checkIfTrainingCenterExists = async (centerId) => new Promise((resolve, reject) => {
  const query = `SELECT id FROM training_centers WHERE id = ${centerId} AND is_active = true`;
  runQuery(query)
    .then((result) => {
      if (result.rowCount === 1) {
        resolve(true);
      }
      resolve(false);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = checkIfTrainingCenterExists;
