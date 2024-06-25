const express = require('express');
const router = express.Router();
const commentService = require('../services/commentService');
const ApiSecurity = require('../middleware/apiSecurity');

router.get('/post/:postId', commentService.getCommentsByPost);
router.get('/:id', commentService.getComment);
router.post('/', ApiSecurity.requireLogin, commentService.createComment);
router.put('/:id', ApiSecurity.requireLogin, commentService.updateComment);
router.delete('/:id', ApiSecurity.requireLogin, commentService.deleteComment);

module.exports = router;
