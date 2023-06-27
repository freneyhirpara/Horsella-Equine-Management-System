const runQuery = require('../dbconn');

const getAllContactQueries = () => new Promise((resolve, reject) => {
  const selectQuery = 'SELECT id, user_name, email, subject, message FROM contact_us ORDER BY id ASC';

  runQuery(selectQuery)
    .then((result) => {
      resolve(result.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getAllContactQueries;
