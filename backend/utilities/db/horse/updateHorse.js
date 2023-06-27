const runQuery = require('../dbconn');

const buildUpdateQuery = (updatedHorse) => `UPDATE horses SET 
horse_name = '${updatedHorse.horseName}',
show_name = '${updatedHorse.showName}', 
gender_id = ${updatedHorse.genderId}, 
breed_id = ${updatedHorse.breedId}, 
color_id = ${updatedHorse.colorId}, 
discipline_id = ${updatedHorse.disciplineId}, 
microchip_number = '${updatedHorse.microchipNumber}', 
horse_weight = ${updatedHorse.horseWeight}, 
horse_height = ${updatedHorse.horseHeight}, 
birthdate = '${updatedHorse.birthDate}', 
father = '${updatedHorse.father}', 
mother = '${updatedHorse.mother}', 
updated_at = '${new Date().toISOString()}'
WHERE id = ${updatedHorse.id} 
RETURNING id, horse_name, owner_id, show_name, gender_id, breed_id, color_id, discipline_id, 
microchip_number, horse_weight, horse_height, birthdate, father, mother`;

const putHorse = (updatedHorse, id) => new Promise((resolve, reject) => {
  const updateHorseQuery = buildUpdateQuery(updatedHorse);
  runQuery(updateHorseQuery)
    .then((horse) => {
      if (horse.rowCount === 1) {
        resolve({
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
          birthdate: horse.rows[0].birthdate,
          father: horse.rows[0].father,
          mother: horse.rows[0].mother,
        });
      }
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = putHorse;
