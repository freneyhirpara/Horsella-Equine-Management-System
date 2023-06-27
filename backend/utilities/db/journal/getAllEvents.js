const runQuery = require('../dbconn');

const getAllEvents = (userId) => new Promise((resovle, reject) => {
  const query = `SELECT j.id, j.event_type as event_id, e.event_type, j.horse_id, h1.horse_name, j.title, 
    j.description, j.start_date, j.end_date FROM journal j JOIN horses h1 ON j.horse_id = h1.id JOIN events e 
    ON j.event_type = e.id AND is_deleted = ${false} 
    AND j.horse_id IN (SELECT id FROM horses WHERE owner_id = ${userId})`;
  runQuery(query)
    .then((resp) => {
      if (resp) {
        resovle(resp.rows);
      } else {
        reject(new Error('QUERY_ERR'));
      }
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getAllEvents;
