const runQuery = require('../dbconn');

const getTrainingCenters = () => new Promise((resolve, reject) => {
  const selectTrainingCenterQuery = `SELECT * FROM training_centers WHERE is_active= ${true} ORDER BY id ASC`;

  runQuery(selectTrainingCenterQuery)
    .then((response) => {
      resolve(response.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getTrainingCenters;
