const runQuery = require('../dbconn');

const checkIfHorseParticipated = (raceId, userId) => new Promise((resolve, reject) => {
  const query = `SELECT count(*) FROM race_participants rp JOIN races r 
    ON r.id = rp.race_id AND r.id = ${raceId} AND rp.user_id = ${userId} 
    AND r.race_date >= CURRENT_DATE;`;
  runQuery(query)
    .then((response) => {
      if (response.rows.count > 0) {
        resolve(true);
      }
      resolve(false);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = checkIfHorseParticipated;
