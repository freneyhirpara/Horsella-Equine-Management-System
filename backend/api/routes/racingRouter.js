const express = require('express');
const { ensureToken } = require('../../utilities/jwtUtils');

const getRaceById = require('../controllers/racing-management/getRaceById');
const getAllRaces = require('../controllers/racing-management/getAllRaces');
const postRace = require('../controllers/racing-management/postRace');
const updateRace = require('../controllers/racing-management/updateRace');
const deleteRace = require('../controllers/racing-management/deleteRace');
const registerParticipant = require('../controllers/racing-management/registerParticipant');
const getParticipationByRace = require('../controllers/racing-management/getParticipationByRace');

const router = express.Router();

// Applying middleware to the whole router
router.use(ensureToken);

/* ---------- RACING ---------- */

// GET: localhost:3000/api/race/all
router.get('/all', (req, resp) => getAllRaces(req, resp));

// POST: localhost:3000/api/race/add
router.post('/add', (req, resp) => postRace(req, resp));

// PATCH: localhost:3000/api/race/update/:id
router.put('/update/:id', (req, resp) => updateRace(req, resp));

// DELETE: localhost:3000/api/race/delete/:id
router.delete('/delete/:id', (req, resp) => deleteRace(req, resp));

/* ---------- PARTICIPATION ---------- */

// GET: localhost:3000/api/race/:id/participate
router.post('/:id/participate', (req, resp) => registerParticipant(req, resp));

// GET: localhost:3000/api/race/:id/participants
router.get('/:id/participants', (req, resp) => getParticipationByRace(req, resp));

/* ---------- RACING ---------- */

// GET: localhost:3000/api/race/:id
router.get('/:id', (req, resp) => getRaceById(req, resp));

module.exports = router;
