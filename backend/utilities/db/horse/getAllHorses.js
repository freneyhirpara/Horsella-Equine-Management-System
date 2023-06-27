const runQuery = require('../dbconn');

const getHorses = () => new Promise((resolve, reject) => {
  const selectHorseQuery = `SELECT h.id, h.horse_name, h.show_name, g.gender, b.breed, c.color, d.discipline, 
    h.microchip_number, h.horse_weight, h.horse_height, h.birthdate, h.father, h.mother 
    FROM horses h 
    LEFT JOIN horse_genders g ON h.gender_id = g.id 
    LEFT JOIN horse_colors c ON h.color_id = c.id 
    LEFT JOIN horse_breeds b ON h.breed_id = b.id 
    LEFT JOIN horse_disciplines d ON h.discipline_id = d.id WHERE is_active = true`;
  runQuery(selectHorseQuery)
    .then((response) => {
      resolve(response.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getHorses;
