const runQuery = require('../dbconn');

const getEventById = (eventId) => new Promise((resovle, reject) => {
  const query = `SELECT j.id, j.event_type as event_id, e.event_type, j.horse_id, h.horse_name, j.title, 
    j.description, j.start_date, j.end_date FROM journal j JOIN events e 
    ON j.event_type = e.id AND j.id = ${eventId} AND is_deleted = ${false} JOIN horses h ON j.horse_id = h.id`;
  runQuery(query)
    .then((resp) => {
      if (resp) {
        resovle(resp.rows[0]);
      } else {
        reject(new Error('QUERY_ERR'));
      }
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getEventById;
