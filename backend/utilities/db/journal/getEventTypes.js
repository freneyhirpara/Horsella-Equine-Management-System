const runQuery = require('../dbconn');

const getEventTypes = () => new Promise((resolve, reject) => {
  const query = 'SELECT id, event_type FROM events';
  runQuery(query)
    .then((resp) => {
      if (resp) {
        resolve(resp.rows);
      } else {
        reject(new Error('QUERY_ERR'));
      }
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getEventTypes;
