const express = require('express');

const { ensureToken } = require('../../utilities/jwtUtils');
const postContactQuery = require('../controllers/contact-us/postContactQuery');
const getAllContactQueries = require('../controllers/contact-us/getAllContactQueries');

const router = express.Router();

// localhost:3000/api/contact-us/add
router.post('/add', (req, resp) => postContactQuery(req, resp));

// localhost:3000/api/contact-us/all
router.get('/all', ensureToken, (req, resp) => getAllContactQueries(req, resp));

module.exports = router;
