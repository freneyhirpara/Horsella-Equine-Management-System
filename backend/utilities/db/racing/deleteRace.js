const runQuery = require('../dbconn');

const deleteRaceById = (id) => new Promise((resolve, reject) => {
  const checkRaceQuery = `select * from races where id = ${id}`;
  runQuery(checkRaceQuery)
    .then((response) => {
      if (response.rows[0] != null) {
        const selectRaceByIdQuery = `update races set is_cancelled = ${true} where id = ${id}`;
        return runQuery(selectRaceByIdQuery);
      }
      throw new Error('INV_RACE_ID');
    })
    .then((race) => {
      resolve(true);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = deleteRaceById;
