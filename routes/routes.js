const express = require('express');
const { login } = require('../controllers/userController');
const { getEventByCode, getEventAll } = require('../controllers/eventController');
const { getCandidatesByEvent } = require('../controllers/candidateController');
const { castVoteByEvent } = require('../controllers/voteController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', login);

router.get('/event/:code', authMiddleware, getEventByCode);
router.get('/event', authMiddleware, getEventAll);

router.get('/event/:eventCode/candidates', authMiddleware, getCandidatesByEvent);
router.post('/event/:eventCode/vote/:candidate_id', authMiddleware, castVoteByEvent);

module.exports = router;
