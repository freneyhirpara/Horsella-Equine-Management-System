const runQuery = require('../dbconn');
const getUserRole = require('./getUserRole');

const buildInsertQuery = (newUser) => {
  let fields = '';
  let values = '';
  fields += 'first_name, ';
  values += `'${newUser.firstname}', `;
  if (newUser.middlename != null) {
    fields += 'middle_name,';
    values += `'${newUser.middlename}', `;
  }
  fields += 'last_name, ';
  values += `'${newUser.lastname}', `;
  if (newUser.phoneRegion != null) {
    fields += 'phone_region, ';
    values += `'${newUser.phoneRegion}', `;
  }
  if (newUser.phoneNumber != null) {
    fields += 'phone_number, ';
    values += `'${newUser.phoneNumber}', `;
  }
  if (newUser.country != null) {
    fields += 'country, ';
    values += `'${newUser.country}', `;
  }
  fields += 'user_role, created_at, updated_at';
  values += `${newUser.role}, '${new Date().toISOString()}', '${new Date().toISOString()}'`;
  return `INSERT INTO users (${fields}) VALUES (${values}) 
  RETURNING id, first_name, middle_name, last_name, phone_region, phone_number, country, user_role`;
};

const postUser = (newUser) => new Promise((resolve, reject) => {
  const insertUserQuery = buildInsertQuery(newUser);
  const insertUserLoginQuery = `INSERT INTO login (email, user_password)
    VALUES ('${newUser.email}', '${newUser.password}') RETURNING email`;
  runQuery(insertUserQuery)
    .then((user) => {
      const output = { ...user.rows[0], email: null, role: null };
      runQuery(insertUserLoginQuery)
        .then((emailObject) => {
          output.email = emailObject.rows[0].email;
          getUserRole(output.id)
            .then((userRole) => {
              output.role = userRole;
              resolve(output);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = postUser;
