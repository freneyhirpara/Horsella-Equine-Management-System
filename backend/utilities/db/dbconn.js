const { Pool } = require('pg');

const pool = new Pool({
  user: 'dkzofcor',
  host: 'rogue.db.elephantsql.com',
  database: 'dkzofcor',
  password: 'CWNFAifsNwm-JkltKvNkswllCweZYqtc',
  port: process.env.DB_PORT,
});

const runQuery = async (query) => new Promise((resolve, reject) => {
  pool.connect((connectErr, client, release) => {
    if (connectErr) {
      reject(connectErr);
    } else {
      client.query(query)
        .then((result) => {
          release();
          resolve(result);
        })
        .catch((err) => {
          release();
          reject(err);
        });
    }
  });
});

module.exports = runQuery;
