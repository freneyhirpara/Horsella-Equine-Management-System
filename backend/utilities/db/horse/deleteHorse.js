const runQuery = require('../dbconn');

const deleteHorseByIdDb = (id) => new Promise((resolve, reject) => {
  const deleteHorseByIdQuery = `UPDATE horses SET is_active = false WHERE id = ${id} `;
  runQuery(deleteHorseByIdQuery)
    .then((response) => {
      if (response.rowCount === 1) {
        resolve(true);
      }
      reject(new Error('QUERY_ERR'));
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = deleteHorseByIdDb;
