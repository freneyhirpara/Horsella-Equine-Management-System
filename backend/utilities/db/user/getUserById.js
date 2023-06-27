const runQuery = require('../dbconn');

const getUserById = async (userId) => new Promise((resolve, reject) => {
  const query = `SELECT 
  u.id, 
  u.first_name, 
  u.middle_name, 
  u.last_name, 
  l.email, 
  u.phone_region, 
  u.phone_number, 
  u.country,
  u.user_role as role_id,
  ur.user_role as role
  FROM users u INNER JOIN login l ON u.id = l.id AND u.id = ${userId} AND l.is_active = true 
  INNER JOIN user_roles ur ON u.user_role = ur.id`;
  runQuery(query)
    .then((result) => {
      if (result.rowCount === 1) {
        resolve(result.rows[0]);
      }
      reject(new Error('INV_USER_ID'));
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getUserById;
