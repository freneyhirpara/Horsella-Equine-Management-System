const runQuery = require('../dbconn');

const deleteEvent = (eventId) => new Promise((resovle, reject) => {
  const query = `UPDATE 
      journal SET is_deleted = ${true}, updated_at = '${new Date().toISOString()}'
      WHERE id=${eventId}`;
  runQuery(query)
    .then((resp) => {
      if (resp) {
        resovle(true);
      } else {
        reject(new Error('QUERY_ERR'));
      }
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = deleteEvent;
