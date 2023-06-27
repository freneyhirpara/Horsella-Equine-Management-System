const runQuery = require('../dbconn');

const buildInsertQuery = (newBreedingCenter) => {
  let fields = '';
  let values = '';
  //----------------------
  fields += 'center_name, ';
  values += `'${newBreedingCenter.centerName}', `;
  //----------------------
  fields += 'owner_name, ';
  values += `'${newBreedingCenter.ownerName}', `;
  //-----------------------
  fields += 'description, ';
  values += `'${newBreedingCenter.description}', `;
  //---------------------
  if (newBreedingCenter.experience != null) {
    fields += 'experience, ';
    values += `'${newBreedingCenter.experience}', `;
  }
  //----------------------
  fields += 'address, ';
  values += `'${newBreedingCenter.address}', `;
  //----------------------
  fields += 'email, ';
  values += `'${newBreedingCenter.email}', `;
  //----------------------
  if (newBreedingCenter.website != null) {
    fields += 'website, ';
    values += `'${newBreedingCenter.website}', `;
  }
  //----------------------
  fields += 'contact, ';
  values += `'${newBreedingCenter.contact}', `;
  //---------------------
  if (newBreedingCenter.workingHours != null) {
    fields += 'working_hours, ';
    values += `'${newBreedingCenter.workingHours}', `;
  }
  //------------------------
  if (newBreedingCenter.imagePath != null) {
    fields += 'image_path, ';
    values += `'${newBreedingCenter.imagePath}', `;
  }
  //------------------------

  fields += 'is_active, created_at, updated_at';
  values += `${true}, '${new Date().toISOString()}', '${new Date().toISOString()}'`;

  return `INSERT INTO breeding_centers (${fields}) VALUES (${values}) 
    RETURNING id, center_name, owner_name, description, address, email, contact, image_path`;
};

const CreateBreedingCenter = (newBreedingCenter) => new Promise((resolve, reject) => {
  const insertUserQuery = buildInsertQuery(newBreedingCenter);
  runQuery(insertUserQuery)
    .then((breedingCenter) => {
      const output = {
        id: breedingCenter.rows[0].id,
        centerName: breedingCenter.rows[0].center_name,
        ownerName: breedingCenter.rows[0].owner_name,
        contact: breedingCenter.rows[0].contact,
        email: breedingCenter.rows[0].email,
        address: breedingCenter.rows[0].address,
        imagePath: breedingCenter.rows[0].image_path,
      };
      resolve(output);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = CreateBreedingCenter;
