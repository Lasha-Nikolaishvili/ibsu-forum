const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
    vote_type: { type: String, enum: ['upvote', 'downvote'], required: true }
}, {
    collection: 'votes',
    timestamps: true,
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    },
    read: 'nearest'
});

const Model = mongoose.model('Vote', voteSchema);
module.exports = Model;