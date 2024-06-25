const express = require('express');
const router = express.Router();
const postService = require('../services/postService');
const ApiSecurity = require('../middleware/apiSecurity');

router.get('/', postService.getPosts);
router.get('/:id', postService.getPost);
router.post('/', ApiSecurity.requireLogin, postService.createPost);
router.put('/:id', ApiSecurity.requireLogin, postService.updatePost);
router.delete('/:id', ApiSecurity.requireLogin, postService.deletePost);

module.exports = router;