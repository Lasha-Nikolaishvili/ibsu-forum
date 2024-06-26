const CommentModel = require('../models/comment');
const PostModel = require('../models/post');

module.exports = {
    createComment: async (req, res) => {
        try {
            const { body, postId, parentCommentId } = req.body;
            const userId = req.user.id;

            if (!body || !postId) {
                return res.status(400).json({ message: 'required_fields_are_missing' });
            }

            const post = await PostModel.findById(postId);
            if (!post) {
                return res.status(404).json({ message: 'post_not_found' });
            }

            const newComment = new CommentModel({
                body,
                author: userId,
                post: postId,
                parent_comment: parentCommentId || null
            });

            const savedComment = await newComment.save();

            res.status(201).json(savedComment);

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    },

    getCommentsByPost: async (req, res) => {
        try {
            const comments = await CommentModel.find({ post: req.params.postId })
                .populate('author', 'username')
                .populate('parent_comment', 'body');
            res.json(comments);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    },

    getComment: async (req, res) => {
        try {
            const comment = await CommentModel.findById(req.params.id)
                .populate('author', 'username')
                .populate('parent_comment', 'body');
            if (!comment) {
                return res.status(404).json({ message: 'comment_not_found' });
            }
            res.json(comment);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    },

    updateComment: async (req, res) => {
        try {
            const { body } = req.body;
            const userId = req.user.id;

            const comment = await CommentModel.findById(req.params.id);
            if (!comment) {
                return res.status(404).json({ message: 'comment_not_found' });
            }

            if (comment.author.toString() !== userId) {
                return res.status(403).json({ message: 'forbidden' });
            }

            comment.body = body || comment.body;

            const updatedComment = await comment.save();

            res.json(updatedComment);

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    },

    deleteComment: async (req, res) => {
        try {
            const userId = req.user.id;

            const comment = await CommentModel.findById(req.params.id);
            if (!comment) {
                return res.status(404).json({ message: 'comment_not_found' });
            }

            if (comment.author.toString() !== userId) {
                return res.status(403).json({ message: 'forbidden' });
            }

            await CommentModel.deleteOne({ _id: comment.id });
            res.json({ message: 'comment_deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    }
};
