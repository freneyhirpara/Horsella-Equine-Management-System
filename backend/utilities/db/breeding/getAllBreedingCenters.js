const runQuery = require('../dbconn');

const getBreedingCenters = () => new Promise((resolve, reject) => {
  const selectBreedingCenterQuery = `SELECT id, center_name, description, owner_name, 
  experience, address, email, website, contact, working_hours FROM breeding_centers 
  WHERE is_active= ${true} ORDER BY id ASC`;
  runQuery(selectBreedingCenterQuery)
    .then((response) => {
      resolve(response.rows);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getBreedingCenters;
