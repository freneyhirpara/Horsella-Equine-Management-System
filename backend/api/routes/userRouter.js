const express = require('express');
const { ensureToken } = require('../../utilities/jwtUtils');

const login = require('../controllers/user-management/loginUser');
const getAllUsers = require('../controllers/user-management/getAllUsers');
const registerUser = require('../controllers/user-management/registerUser');
const updateUser = require('../controllers/user-management/updateUser');
const deleteUser = require('../controllers/user-management/deleteUser');
const getUserById = require('../controllers/user-management/getUserById');
const changePassword = require('../controllers/user-management/updatePassword');
const applyReset = require('../controllers/user-management/applyReset');
const resetPassword = require('../controllers/user-management/resetPassword');

const router = express.Router();

router.post('/login', (req, resp) => login(req, resp));
router.get('/all', ensureToken, (req, resp) => getAllUsers(req, resp));
router.post('/register', (req, resp) => registerUser(req, resp));
router.put('/update/:id', ensureToken, (req, resp) => updateUser(req, resp));
router.delete('/delete/:id', ensureToken, (req, resp) => deleteUser(req, resp));
router.get('/:id', ensureToken, (req, resp) => getUserById(req, resp));
router.put('/changePassword', ensureToken, (req, resp) => changePassword(req, resp));
router.post('/applyreset', (req, resp) => applyReset(req, resp));
router.post('/resetpassword', ensureToken, (req, resp) => resetPassword(req, resp));

module.exports = router;
