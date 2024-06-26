const PostModel = require('../models/post');
const TopicModel = require('../models/topic');


module.exports = {
    createPost: async (req, res) => {
        try {
            const { title, body, topicId } = req.body;
            const userId = req.user.id;

            if (!title || !body || !topicId) {
                return res.status(400).json({ message: 'required_fields_are_missing' });
            }

            const topic = await TopicModel.findById(topicId);
            if (!topic) {
                return res.status(404).json({ message: 'topic_not_found' });
            }

            const newPost = new PostModel({
                title,
                body,
                author: userId,
                topic: topicId
            });

            const savedPost = await newPost.save();

            res.status(201).json(savedPost);

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    },

    getPosts: async (req, res) => {
        try {
            const posts = await PostModel.find().populate('author', 'username').populate('topic', 'name');
            res.json(posts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    },

    getPost: async (req, res) => {
        try {
            const post = await PostModel.findById(req.params.id).populate('author', 'username').populate('topic', 'name');
            if (!post) {
                return res.status(404).json({ message: 'post_not_found' });
            }
            res.json(post);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    },

    updatePost: async (req, res) => {
        try {
            const { title, body } = req.body;
            const userId = req.user.id;

            const post = await PostModel.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'post_not_found' });
            }

            if (post.author.toString() !== userId) {
                return res.status(403).json({ message: 'forbidden' });
            }

            post.title = title || post.title;
            post.body = body || post.body;

            const updatedPost = await post.save();

            res.json(updatedPost);

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    },

    deletePost: async (req, res) => {
        try {
            const userId = req.user.id;

            const post = await PostModel.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'post_not_found' });
            }

            if (post.author.toString() !== userId) {
                return res.status(403).json({ message: 'forbidden' });
            }

            await PostModel.deleteOne({ _id: post.id });
            res.json({ message: 'post_deleted' });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    }
};