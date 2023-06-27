const express = require('express');
const { ensureToken } = require('../../utilities/jwtUtils');

const getBreedingCenterById = require('../controllers/breeding-management/getBreedingCenterById');
const getAllBreedingCenters = require('../controllers/breeding-management/getAllBreedingCenters');
const postBreedingCenter = require('../controllers/breeding-management/postBreedingCenter');
const updateBreedingCenter = require('../controllers/breeding-management/updateBreedingCenter');
const deleteBreedingCenter = require('../controllers/breeding-management/deleteBreedingCenter');

const router = express.Router();

// Applying middleware to the whole router
router.use(ensureToken);

// GET: localhost:3000/api/breeding-center/all
router.get('/all', (req, resp) => getAllBreedingCenters(req, resp));

// POST: localhost:3000/api/breeding-center/add
router.post('/add', (req, resp) => postBreedingCenter(req, resp));

// PATCH: localhost:3000/api/breeding-center/update/:id
router.put('/update/:id', (req, resp) => updateBreedingCenter(req, resp));

// DELETE: localhost:3000/api/breeding-center/delete/:id
router.delete('/delete/:id', (req, resp) => deleteBreedingCenter(req, resp));

// GET: localhost:3000/api/breeding-center/:id
router.get('/:id', (req, resp) => getBreedingCenterById(req, resp));

module.exports = router;
