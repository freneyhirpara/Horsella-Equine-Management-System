const runQuery = require('../dbconn');
const { comparePassword, encryptPassword } = require('../../bcryptUtils');

const buildUpdateQuery = ({ id, newPassword }) => {
  const updateUsersQuery = `UPDATE login SET 
  user_password = '${encryptPassword(newPassword)}',
  pass_changed = ${true}
  WHERE id = ${id}`;
  return updateUsersQuery;
};

const updatePassword = ({ id, oldPassword, newPassword }) => new Promise((resolve, reject) => {
  const updateUsersQuery = buildUpdateQuery({ id, newPassword });
  const checkPasswordQuery = `SELECT user_password FROM login WHERE id = ${id}`;
  runQuery(checkPasswordQuery)
    .then((resp) => {
      if (resp.rowCount === 1) {
        if (comparePassword(oldPassword, resp.rows[0].user_password)) {
          runQuery(updateUsersQuery)
            .then((updateResp) => {
              resolve(true);
            });
        } else {
          reject(new Error('INV_OLD_PASS'));
        }
      } else {
        reject(new Error('INV_USER_ID'));
      }
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = updatePassword;
