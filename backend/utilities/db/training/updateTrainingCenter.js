const runQuery = require('../dbconn');

const buildUpdateQuery = (updatedTrainingCenter) => `update training_centers set center_name = '${
  updatedTrainingCenter.centerName
}', owner_name = '${updatedTrainingCenter.ownerName}', description = '${
  updatedTrainingCenter.description
}', experience= '${updatedTrainingCenter.experience}',
    address = '${updatedTrainingCenter.address}', email = '${
  updatedTrainingCenter.email
}', website = '${updatedTrainingCenter.website}', contact = '${
  updatedTrainingCenter.contact
}', working_hours = '${updatedTrainingCenter.workingHours}', is_active=${true} where id = ${updatedTrainingCenter.id}
    RETURNING id, center_name, owner_name, description, address, email, contact`;

const putTrainingCenter = (updatedTrainingCenter) => new Promise((resolve, reject) => {
  const updateCenterQuery = buildUpdateQuery(updatedTrainingCenter);
  runQuery(updateCenterQuery)
    .then((trainingCenter) => {
      const output = {
        id: trainingCenter.rows[0].id,
        centerName: trainingCenter.rows[0].center_name,
        ownerName: trainingCenter.rows[0].owner_name,
        contact: trainingCenter.rows[0].contact,
        email: trainingCenter.rows[0].email,
        address: trainingCenter.rows[0].address,
      };
      resolve(output);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = putTrainingCenter;
