const runQuery = require('../dbconn');

const applyResetDb = (email) => new Promise((resolve, reject) => {
  const checkEmailQuery = `SELECT id, email, user_password FROM login WHERE email = '${email}' AND is_active = ${true}`;
  runQuery(checkEmailQuery)
    .then((resp) => {
      if (resp.rowCount === 1) {
        resolve({ id: resp.rows[0].id, email: resp.rows[0].email, password: resp.rows[0].user_password });
      } else {
        reject(new Error('INV_USER_EMAIL'));
      }
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = applyResetDb;
