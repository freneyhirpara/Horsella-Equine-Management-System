const runQuery = require('../dbconn');

const updateEvent = (id, {
  eventId,
  horseId,
  title,
  description,
  startDate,
  endDate,
}) => new Promise((resolve, reject) => {
  const insertQuery = `UPDATE journal 
      SET event_type = ${eventId},
      horse_id = ${horseId},
      title = '${title}',
      description = '${description}',
      start_date = '${startDate}',
      end_date = '${endDate}',
      updated_at = '${new Date().toISOString()}'
      WHERE id = ${id}
      RETURNING id, event_type, horse_id, title, description, start_date, end_date`;
  runQuery(insertQuery)
    .then((result) => {
      if (!result) {
        reject(new Error('QUERY_ERR'));
      }
      resolve(result.rows[0]);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = updateEvent;
