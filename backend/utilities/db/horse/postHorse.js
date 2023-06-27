const runQuery = require('../dbconn');

const buildInsertQuery = (newHorse) => {
  let fields = '';
  let values = '';

  fields += 'horse_name, ';
  values += `'${newHorse.horseName}', `;

  fields += 'owner_id, ';
  values += `'${newHorse.ownerId}', `;

  if (newHorse.showName != null) {
    fields += 'show_name, ';
    values += `'${newHorse.showName}', `;
  }

  fields += 'gender_id, ';
  values += `'${newHorse.genderId}', `;

  fields += 'breed_id, ';
  values += `'${newHorse.breedId}', `;

  fields += 'color_id, ';
  values += `'${newHorse.colorId}', `;

  fields += 'discipline_id, ';
  values += `'${newHorse.disciplineId}', `;

  if (newHorse.microchipNumber != null) {
    fields += 'microchip_number, ';
    values += `'${newHorse.microchipNumber}', `;
  }

  if (newHorse.horseWeight != null) {
    fields += 'horse_weight, ';
    values += `'${newHorse.horseWeight}', `;
  }

  if (newHorse.horseHeight != null) {
    fields += 'horse_height, ';
    values += `'${newHorse.horseHeight}', `;
  }

  fields += 'birthdate, ';
  values += `'${newHorse.birthDate}', `;

  if (newHorse.father != null) {
    fields += 'father, ';
    values += `'${newHorse.father}', `;
  }

  if (newHorse.mother != null) {
    fields += 'mother, ';
    values += `'${newHorse.mother}', `;
  }

  fields += 'is_active, created_at, updated_at';
  values += `${true}, '${new Date().toISOString()}', '${new Date().toISOString()}'`;
  return `INSERT INTO horses (${fields}) VALUES (${values}) 
    RETURNING id, horse_name, owner_id, show_name, gender_id, breed_id, color_id, 
    discipline_id, microchip_number, horse_weight, horse_height, birthdate, father, mother`;
};

const CreateNewHorse = (newHorse) => new Promise((resolve, reject) => {
  const insertHorseQuery = buildInsertQuery(newHorse);
  runQuery(insertHorseQuery)
    .then((horse) => {
      const output = {
        id: horse.rows[0].id,
        horse_name: horse.rows[0].horse_name,
        owner_id: horse.rows[0].owner_id,
        show_name: horse.rows[0].show_name,
        gender_id: horse.rows[0].gender_id,
        breed_id: horse.rows[0].breed_id,
        color_id: horse.rows[0].color_id,
        discipline_id: horse.rows[0].discipline_id,
        microchip_number: horse.rows[0].microchip_number,
        horse_weight: horse.rows[0].horse_weight,
        horse_height: horse.rows[0].horse_height,
        birthdate: horse.rows[0].birthdate.toString(),
        father: horse.rows[0].father,
        mother: horse.rows[0].mother,
      };
      resolve(output);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = CreateNewHorse;
