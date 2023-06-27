const runQuery = require('../dbconn');

const postParticipation = ({
  raceId, userId, horseId, riderName,
}) => new Promise((resolve, reject) => {
  const query = `INSERT INTO race_participants 
    (race_id, user_id, horse_id, rider_name, created_at) 
    VALUES 
    (${raceId}, ${userId}, ${horseId}, '${riderName}', '${new Date().toISOString()}')
    RETURNING id, race_id, user_id, horse_id, rider_name, finish_position`;
  runQuery(query)
    .then((result) => {
      if (result.rowCount === 1) {
        resolve(result.rows[0]);
      }
      reject(new Error('QUERY_ERR'));
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = postParticipation;
