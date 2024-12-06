const express = require('express');
const { login } = require('../controllers/userController');
const { castVote } = require('../controllers/voteController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', login);
router.post('/vote', castVote);

module.exports = router;
