const express = require('express');
const { ensureToken } = require('../../utilities/jwtUtils');

// Horse Profile
const getHorseById = require('../controllers/horse-management/getHorseById');
const getHorseByUserId = require('../controllers/horse-management/getHorseByUserId');
const getAllHorses = require('../controllers/horse-management/getAllHorses');
const postHorse = require('../controllers/horse-management/postHorse');
const updateHorse = require('../controllers/horse-management/updateHorse');
const deleteHorse = require('../controllers/horse-management/deleteHorse');

// Horse utils
const getAllHorseGenders = require('../controllers/horse-management/horse-utils/getAllHorseGenders');
const getAllHorseDisciplines = require('../controllers/horse-management/horse-utils/getAllHorseDisciplines');
const getAllHorseColors = require('../controllers/horse-management/horse-utils/getAllHorseColors');
const getAllHorseBreeds = require('../controllers/horse-management/horse-utils/getAllHorseBreeds');

// Selling
const getAllSellingHorses = require('../controllers/horse-management/selling/getAllSellingHorses');
const getAllSellingHorsesByUser = require('../controllers/horse-management/selling/getAllSellingHorseByUser');
const registerHorseForSale = require('../controllers/horse-management/selling/registerHorseForSale');
const updateHorseSold = require('../controllers/horse-management/selling/updateHorseSold');

// Buying
const getAllHorseBoughtByUser = require('../controllers/horse-management/buying/getAllHorseBoughtByUser');
const getAllHorsesBought = require('../controllers/horse-management/buying/getAllHorsesBought');

const router = express.Router();

// Applying middleware to the whole router
router.use(ensureToken);

/* ----- ----- HORSE PROFILE ----- ----- */

// To get all horses for a specific user
// GET: localhost:3000/api/horse/list
router.get('/list', (req, resp) => getHorseByUserId(req, resp));

// GET: localhost:3000/api/horse/all
router.get('/all', (req, resp) => getAllHorses(req, resp));

// POST: localhost:3000/api/horse/add
router.post('/add', (req, resp) => postHorse(req, resp));

// PATCH: localhost:3000/api/horse/update/:id
router.put('/update/:id', (req, resp) => updateHorse(req, resp));

// DELETE: localhost:3000/api/horse/delete/:id
router.delete('/delete/:id', (req, resp) => deleteHorse(req, resp));

/* ---------- HORSE UTILS ---------- */

// GET: localhost:3000/api/horse/genders
router.get('/genders', (req, resp) => getAllHorseGenders(req, resp));

// GET: localhost:3000/api/horse/colors
router.get('/colors', (req, resp) => getAllHorseColors(req, resp));

// GET: localhost:3000/api/horse/disciplines
router.get('/disciplines', (req, resp) => getAllHorseDisciplines(req, resp));

// GET: localhost:3000/api/horse/breeds
router.get('/breeds', (req, resp) => getAllHorseBreeds(req, resp));

/* ---------- SELLING ---------- */

// GET: localhost:3000/api/horse/selling/all
router.get('/selling/all', (req, resp) => getAllSellingHorses(req, resp));

// GET: localhost:3000/api/horse/my-sales
router.get('/my-sales', (req, resp) => getAllSellingHorsesByUser(req, resp));

// POST: localhost:3000/api/horse/sell-horse/:horseId
router.post('/sell-horse/:horseId', (req, resp) => registerHorseForSale(req, resp));

// PUT: localhost:3000/api/horse/update-horse-sold/:saleId
router.put('/update-horse-sold/:saleId', (req, resp) => updateHorseSold(req, resp));

/* ---------- BUYING ---------- */

// GET: localhost:3000/api/horse/purchases/all
router.get('/purchases/all', (req, resp) => getAllHorsesBought(req, resp));

// GET: localhost:3000/api/horse/my-purchases
router.get('/my-purchases', (req, resp) => getAllHorseBoughtByUser(req, resp));

/* ---------- HORSE PROFILE ---------- */

// GET: localhost:3000/api/horse/:id
router.get('/:id', (req, resp) => getHorseById(req, resp));

module.exports = router;
