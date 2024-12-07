const express = require('express');
const { login } = require('../controllers/userController');
const { getEventByCode, getEventAll } = require('../controllers/eventController');
const { getCandidates } = require('../controllers/candidateController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', login);

router.get('/event/:code', authMiddleware, getEventByCode);
router.get('/event', authMiddleware, getEventAll);

router.get('/candidate', authMiddleware, getCandidates);


module.exports = router;
