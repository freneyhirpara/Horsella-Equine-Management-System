const runQuery = require('../dbconn');

const getParticipationByRace = (raceId) => new Promise((resolve, reject) => {
  const query = `SELECT id, user_id, horse_id, rider_name, finish_position 
    FROM race_participants WHERE race_id = ${raceId} ORDER BY id ASC`;
  runQuery(query)
    .then((results) => {
      resolve(results.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getParticipationByRace;
