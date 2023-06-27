const runQuery = require('../dbconn');

const buildInsertQuery = (newTrainingCenter) => {
  let fields = '';
  let values = '';
  //----------------------
  fields += 'center_name, ';
  values += `'${newTrainingCenter.centerName}', `;
  //----------------------
  fields += 'owner_name, ';
  values += `'${newTrainingCenter.ownerName}', `;
  //-----------------------
  fields += 'description, ';
  values += `'${newTrainingCenter.description}', `;
  //---------------------
  if (newTrainingCenter.experience != null) {
    fields += 'experience, ';
    values += `'${newTrainingCenter.experience}', `;
  }
  //----------------------
  fields += 'address, ';
  values += `'${newTrainingCenter.address}', `;
  //----------------------
  fields += 'email, ';
  values += `'${newTrainingCenter.email}', `;
  //----------------------
  if (newTrainingCenter.website != null) {
    fields += 'website, ';
    values += `'${newTrainingCenter.website}', `;
  }
  //----------------------
  fields += 'contact, ';
  values += `'${newTrainingCenter.contact}', `;
  //---------------------
  if (newTrainingCenter.workingHours != null) {
    fields += 'working_hours, ';
    values += `'${newTrainingCenter.workingHours}', `;
  }
  //------------------------
  if (newTrainingCenter.imagePath != null) {
    fields += 'image_path, ';
    values += `'${newTrainingCenter.imagePath}', `;
  }
  //------------------------

  fields += 'is_active, created_at, updated_at';
  values += `${true}, '${new Date().toISOString()}', '${new Date().toISOString()}'`;

  return `INSERT INTO training_centers (${fields}) VALUES (${values}) 
    RETURNING id, center_name, owner_name, description, address, email, contact, image_path`;
};

const CreateTrainingCenter = (newTrainingCenter) => new Promise((resolve, reject) => {
  const insertUserQuery = buildInsertQuery(newTrainingCenter);
  runQuery(insertUserQuery)
    .then((trainingCenter) => {
      const output = {
        id: trainingCenter.rows[0].id,
        centerName: trainingCenter.rows[0].center_name,
        ownerName: trainingCenter.rows[0].owner_name,
        contact: trainingCenter.rows[0].contact,
        email: trainingCenter.rows[0].email,
        address: trainingCenter.rows[0].address,
        imagePath: trainingCenter.rows[0].image_path,
      };
      resolve(output);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = CreateTrainingCenter;
