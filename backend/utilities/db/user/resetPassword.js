const runQuery = require('../dbconn');

const resetPassword = (id, newPassword) => new Promise((resolve, reject) => {
  const resetPasswordQuery = `UPDATE login SET user_password = '${newPassword}' WHERE id = ${id}`;
  runQuery(resetPasswordQuery)
    .then((resp) => {
      resolve(true);
    })
    .catch((err) => {
      reject(err);
    });
});

const getUserDetails = (id) => new Promise((resolve, reject) => {
  const getQuery = `SELECT id, email, user_password FROM login WHERE id = ${id} and is_active = ${true}`;
  runQuery(getQuery)
    .then((resp) => {
      if (resp.rowCount === 1) {
        resolve(resp.rows[0]);
      } else {
        reject(new Error('INV_USER_ID'));
      }
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = { resetPassword, getUserDetails };
