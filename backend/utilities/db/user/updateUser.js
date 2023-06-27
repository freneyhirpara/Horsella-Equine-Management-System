const runQuery = require('../dbconn');
const getUserById = require('./getUserById');

const buildUpdateQuery = (updatedUser) => {
  const updateUsersQuery = `UPDATE users SET 
  first_name = '${updatedUser.firstname}',
  middle_name = '${updatedUser.middlename}', 
  last_name = '${updatedUser.lastname}', 
  phone_region = '${updatedUser.phoneRegion}', 
  phone_number = '${updatedUser.phoneNumber}', 
  country = '${updatedUser.country}', 
  user_role = ${updatedUser.role}, 
  updated_at = '${new Date().toISOString()}' WHERE id = ${updatedUser.id}`;
  return updateUsersQuery;
};

const patchUser = (updatedUser) => new Promise((resolve, reject) => {
  const updateUsersQuery = buildUpdateQuery(updatedUser);
  runQuery(updateUsersQuery)
    .then(() => {
      getUserById(updatedUser.id)
        .then((output) => {
          resolve(output);
        })
        .catch((err) => {
          reject(err);
        });
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = patchUser;
