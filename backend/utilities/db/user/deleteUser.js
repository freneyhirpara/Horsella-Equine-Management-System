const runQuery = require('../dbconn');

const deleteUser = async (userId) => new Promise((resolve, reject) => {
  const query = `UPDATE login SET is_active = false WHERE id = ${userId}`;
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

module.exports = deleteUser;
