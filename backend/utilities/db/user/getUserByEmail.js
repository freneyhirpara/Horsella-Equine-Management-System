const runQuery = require('../dbconn');
const { comparePassword } = require('../../bcryptUtils');

const getUserByEmail = async ({ email, password }) => new Promise((resolve, reject) => {
  const query = `SELECT 
  u.id, 
  u.first_name, 
  u.middle_name, 
  u.last_name, 
  l.email,
  l.user_password, 
  l.pass_changed,
  u.phone_region, 
  u.phone_number, 
  u.country, 
  ur.user_role as role
  FROM users u INNER JOIN login l ON u.id = l.id AND l.email = '${email}' AND l.is_active = true 
  INNER JOIN user_roles ur ON u.user_role = ur.id`;
  runQuery(query)
    .then((result) => {
      if (result.rowCount === 1 && comparePassword(password, result.rows[0].user_password)) {
        resolve(result.rows[0]);
      }
      resolve(false);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getUserByEmail;
