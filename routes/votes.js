const express = require('express');
const router = express.Router();
const voteService = require('../services/voteService');
const ApiSecurity = require('../middleware/apiSecurity');

router.get('/', voteService.getVotes);
router.post('/', ApiSecurity.requireLogin, voteService.vote);

module.exports = router;
