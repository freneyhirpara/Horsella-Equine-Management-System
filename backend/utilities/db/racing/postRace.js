const runQuery = require('../dbconn');

// id,
// raceName,
// racecourse,
// RaceDate,
// raceLength,
// raceHorseAgeCriteria,
// RaceHorseWeightCriteria,

const buildInsertQuery = (newRace) => {
  let fields = '';
  let values = '';
  //----------------------
  fields += 'race_name, ';
  values += `'${newRace.raceName}', `;
  //----------------------
  fields += 'race_course, ';
  values += `'${newRace.raceCourse}', `;
  //-----------------------
  fields += 'race_date, ';
  values += `'${newRace.raceDate}', `;
  //----------------------
  fields += 'race_length, ';
  values += `'${newRace.raceLength}', `;
  //----------------------
  fields += 'racehorse_age_criteria, ';
  values += `${newRace.raceHorseAgeCriteria}, `;
  //----------------------
  fields += 'racehorse_weight_criteria, ';
  values += `'${newRace.raceHorseWeightCriteria}', `;
  //---------------------

  fields += 'is_cancelled, is_completed , created_at, updated_at';
  values += `${false}, ${false}, '${new Date().toISOString()}', '${new Date().toISOString()}'`;

  return `INSERT INTO races (${fields}) VALUES (${values}) 
    RETURNING id, race_name, race_course, race_date, racehorse_age_criteria, racehorse_weight_criteria`;
};

const CreateRace = (newRace) => new Promise((resolve, reject) => {
  const insertRaceQuery = buildInsertQuery(newRace);
  runQuery(insertRaceQuery)
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

module.exports = CreateRace;
