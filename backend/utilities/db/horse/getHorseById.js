const runQuery = require('../dbconn');

const getHorseByIdDb = (id) => new Promise((resolve, reject) => {
  const selectHorseByIdQuery = `SELECT h.id, h.horse_name, h.show_name, h.gender_id, g.gender, 
  h.breed_id, b.breed, h.color_id, c.color, h.discipline_id, d.discipline, 
  h.microchip_number, h.horse_weight, h.horse_height, h.birthdate, h.father, h.mother 
  FROM horses h 
  LEFT JOIN horse_genders g ON h.gender_id = g.id
  LEFT JOIN horse_colors c ON h.color_id = c.id 
  LEFT JOIN horse_breeds b ON h.breed_id = b.id 
  LEFT JOIN horse_disciplines d ON h.discipline_id = d.id WHERE is_active = true AND h.id = ${id}`;
  runQuery(selectHorseByIdQuery)
    .then((response) => {
      if (response.rowCount === 1) {
        resolve(response.rows[0]);
      }
      reject(new Error('INV_HORSE_ID'));
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getHorseByIdDb;
