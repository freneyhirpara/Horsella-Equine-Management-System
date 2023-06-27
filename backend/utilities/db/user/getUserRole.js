const runQuery = require('../dbconn');

const getUserRole = (userId) => new Promise((resolve, reject) => {
  const query = `SELECT ur.user_role as role FROM users u INNER JOIN 
    user_roles ur ON u.user_role = ur.id AND u.id = ${userId}`;
  runQuery(query)
    .then((result) => {
      if (result.rowCount === 1) {
        resolve(result.rows[0].role);
      } else {
        reject(new Error('INV_ROLE_ID'));
      }
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = getUserRole;
