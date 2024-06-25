const express = require('express');
const router = express.Router();
const topicService = require('../services/topicService');
const ApiSecurity = require('../middleware/apiSecurity');

router.get('/', topicService.getTopics);
router.get('/:id', topicService.getTopic);
router.post('/', ApiSecurity.requireLogin, topicService.createTopic);
router.put('/:id', ApiSecurity.requireLogin, topicService.updateTopic);
router.delete('/:id', ApiSecurity.requireLogin, topicService.deleteTopic);

module.exports = router;
