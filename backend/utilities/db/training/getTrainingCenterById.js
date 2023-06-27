const runQuery = require('../dbconn');

const getTrainingCenterByIdDb = (id) => new Promise((resolve, reject) => {
  const selectTrainingCenterByIdQuery = `SELECT * FROM training_centers WHERE id = ${id} AND is_active = ${true}`;

  runQuery(selectTrainingCenterByIdQuery)
    .then((response) => {
      resolve(response.rows[0]);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getTrainingCenterByIdDb;
