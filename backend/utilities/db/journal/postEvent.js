const runQuery = require('../dbconn');

const postEvent = ({
  eventId, horseId, title, description, startDate, endDate,
}) => new Promise((resolve, reject) => {
  const insertQuery = `INSERT INTO journal 
  (event_type, horse_id, title, description, start_date, end_date, created_at, updated_at)
  VALUES
  (${eventId}, ${horseId}, '${title}', '${description}', '${startDate}', '${endDate}', 
    '${new Date().toISOString()}', '${new Date().toISOString()}')
  RETURNING id, event_type, horse_id, title, description, start_date, end_date`;
  runQuery(insertQuery)
    .then((result) => {
      if (result.rowCount !== 1) {
        reject(new Error('QUERY_ERR'));
      }
      resolve(result.rows[0]);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = postEvent;
