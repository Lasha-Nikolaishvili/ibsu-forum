const TopicModel = require('../models/topic');

module.exports = {
    createTopic: async (req, res) => {
        try {
            const { name, description, moderators } = req.body;

            if (!name || !description) {
                return res.status(400).json({ message: 'required_fields_are_missing' });
            }

            const exists = await TopicModel.findOne({ name });
            if (exists) {
                return res.status(409).json({ message: 'topic_already_exists' });
            }


            const newTopic = new TopicModel({
                name,
                description,
                moderators
            });

            const savedTopic = await newTopic.save();

            res.status(201).json(savedTopic);

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    },

    getTopics: async (req, res) => {
        try {
            const topics = await TopicModel.find().populate('moderators', 'username');
            res.json(topics);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    },

    getTopic: async (req, res) => {
        try {
            const topic = await TopicModel.findById(req.params.id).populate('moderators', 'username');
            if (!topic) {
                return res.status(404).json({ message: 'topic_not_found' });
            }
            res.json(topic);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    },

    updateTopic: async (req, res) => {
        try {
            const { name, description, moderators } = req.body;

            const topic = await TopicModel.findById(req.params.id);
            if (!topic) {
                return res.status(404).json({ message: 'topic_not_found' });
            }

            if (!topic.moderators.includes(req.user.id)) {
                return res.status(403).json({ message: 'not_authorized' });
            }

            topic.name = name || topic.name;
            topic.description = description || topic.description;
            topic.moderators = moderators || topic.moderators;

            const updatedTopic = await topic.save();

            res.json(updatedTopic);

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    },

    deleteTopic: async (req, res) => {
        try {
            const topic = await TopicModel.findById(req.params.id);
            if (!topic) {
                return res.status(404).json({ message: 'topic_not_found' });
            }

            if (!topic.moderators.includes(req.user.id)) {
                return res.status(403).json({ message: 'not_authorized' });
            }

            await TopicModel.deleteOne({ _id: topic.id });
            res.json({ message: 'topic_deleted' });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal_server_error' });
        }
    }
};
