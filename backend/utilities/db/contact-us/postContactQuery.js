const runQuery = require('../dbconn');

const postContactQuery = (
  {
    userName, email, subject, message,
  },
) => new Promise((resolve, reject) => {
  const insertQuery = `INSERT INTO contact_us (user_name, email, subject, message) 
    VALUES ('${userName}', '${email}', '${subject}', '${message.replace('\'', '')}') 
    RETURNING id, user_name, email, subject, message`;
  runQuery(insertQuery)
    .then((result) => {
      if (result.rowCount !== 1) {
        reject(new Error('QUERY_ERR'));
      }
      resolve(result.rows[0]);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = postContactQuery;
