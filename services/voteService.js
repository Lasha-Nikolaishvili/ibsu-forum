const VoteModel = require('../models/vote');
const PostModel = require('../models/post');
const CommentModel = require('../models/comment');

module.exports = {
    vote: async (req, res) => {
        try {
            const { postId, commentId, voteType } = req.body;
            const userId = req.user.id;

            if (!postId && !commentId) {
                return res.status(400).json({ message: 'either_post_or_comment_id_is_required' });
            }

            if (!voteType || !['upvote', 'downvote'].includes(voteType)) {
                return res.status(400).json({ message: 'invalid_vote_type' });
            }

            let vote;
            let entity;

            if (postId) {
                vote = await VoteModel.findOne({ user: userId, post: postId });
                entity = await PostModel.findById(postId);
            } else if (commentId) {
                vote = await VoteModel.findOne({ user: userId, comment: commentId });
                entity = await CommentModel.findById(commentId);
            }

            if (!entity) {
                return res.status(404).json({ message: 'entity_not_found' });
            }

            if (vote) {
                if (vote.vote_type === voteType) {
                    return res.status(400).json({ message: 'already_voted' });
                }

                entity.votes += voteType === 'upvote' ? 2 : -2; // Reverses the previous vote
                vote.vote_type = voteType;
                await vote.save();
            } else {
                vote = new VoteModel({ user: userId, post: postId, comment: commentId, vote_type: voteType });
                entity.votes += voteType === 'upvote' ? 1 : -1;
                await vote.save();
            }

            await entity.save();

            res.json({ message: 'vote_registered', vote });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    },

    getVotes: async (req, res) => {
        try {
            const votes = await VoteModel.find()
                .populate('user', 'username')
                .populate('post', 'title')
                .populate('comment', 'body');
            res.json(votes);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    }
};