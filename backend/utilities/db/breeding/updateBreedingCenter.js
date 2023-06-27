const runQuery = require('../dbconn');

const buildUpdateQuery = (updatedBreedingCenter) => `update breeding_centers set center_name = '${
  updatedBreedingCenter.centerName
}', owner_name = '${updatedBreedingCenter.ownerName}', description = '${
  updatedBreedingCenter.description
}', experience= '${updatedBreedingCenter.experience}',
    address = '${updatedBreedingCenter.address}', email = '${
  updatedBreedingCenter.email
}', website = '${updatedBreedingCenter.website}', contact = '${
  updatedBreedingCenter.contact
}', working_hours = '${updatedBreedingCenter.workingHours}', image_path='${
  updatedBreedingCenter.imagePath
}', is_active=${true} where id = ${updatedBreedingCenter.id}
    RETURNING id, center_name, owner_name, description, address, email, contact, image_path`;

const putbreedingCenter = (updatedBreedingCenter) => new Promise((resolve, reject) => {
  const updateCenterQuery = buildUpdateQuery(updatedBreedingCenter);
  runQuery(updateCenterQuery)
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

module.exports = putbreedingCenter;
