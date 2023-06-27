const express = require('express');
const { ensureToken } = require('../../utilities/jwtUtils');

const getEventTypes = require('../controllers/journal-management/getEventTypes');
const getAllEvents = require('../controllers/journal-management/getAllEvents');
const getEventById = require('../controllers/journal-management/getEventById');
const postEvent = require('../controllers/journal-management/postEvent');
const updateEvent = require('../controllers/journal-management/updateEvent');
const deleteEvent = require('../controllers/journal-management/deleteEvent');

const router = express.Router();

router.use(ensureToken);

// GET: localhost:3000/api/journal/eventtypes
router.get('/eventtypes', (req, resp) => getEventTypes(req, resp));

// GET: localhost:3000/api/journal/all
router.get('/all', (req, resp) => getAllEvents(req, resp));

// GET: localhost:3000/api/journal/:id
router.get('/:id', (req, resp) => getEventById(req, resp));

// POST: localhost:3000/api/journal
router.post('/', (req, resp) => postEvent(req, resp));

// PUT: localhost:3000/api/journal/:id
router.put('/:id', (req, resp) => updateEvent(req, resp));

// DELETE: localhost:3000/api/journal/:id
router.delete('/:id', (req, resp) => deleteEvent(req, resp));

module.exports = router;
