const runQuery = require('../dbconn');

const buildUpdateQuery = (updatedRace, id) => `update races set race_name = '${
  updatedRace.raceName
}', race_course = '${updatedRace.raceCourse}', race_date = '${
  updatedRace.raceDate
}', race_length = '${updatedRace.raceLength}', racehorse_age_criteria = '${
  updatedRace.raceHorseAgeCriteria
}', racehorse_weight_criteria = '${
  updatedRace.raceHorseWeightCriteria
}', is_completed= '${updatedRace.isCompleted}' where id = ${id}
  RETURNING id, race_name, race_course, race_date, racehorse_age_criteria, racehorse_weight_criteria`;

const putRace = (updatedRace, id) => new Promise((resolve, reject) => {
  const checkRaceQuery = `select * from races where id = ${id}`;
  runQuery(checkRaceQuery)
    .then((response) => {
      if (response.rows[0] != null) {
        const updateRaceQuery = buildUpdateQuery(updatedRace, id);
        return runQuery(updateRaceQuery);
      }
      throw new Error('INV_RACE_ID');
    })
    .then((race) => {
      const output = {
        id: race.rows[0].id,
        raceName: race.rows[0].race_name,
        raceCourse: race.rows[0].race_course,
        raceDate: race.rows[0].race_date,
        raceHorseAgeCriteria: race.rows[0].racehorse_age_criteria,
        raceHorseWeightCriteria: race.rows[0].racehorse_weight_criteria,
      };
      resolve(output);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = putRace;
