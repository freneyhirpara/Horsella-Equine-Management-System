const runQuery = require('../dbconn');

const getBreedingCenterById = (id) => new Promise((resolve, reject) => {
  const selectBreedingCenterByIdQuery = `SELECT id, center_name, description, owner_name, 
  experience, address, email, website, contact, working_hours FROM breeding_centers 
  WHERE id = ${id} AND is_active = ${true}`;

  runQuery(selectBreedingCenterByIdQuery)
    .then((response) => {
      if (response.rows[0] != null) {
        resolve(response.rows[0]);
      }
      reject(new Error('INV_CNTR_ID'));
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getBreedingCenterById;
