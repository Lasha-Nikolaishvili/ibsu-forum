const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  moderators: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
    collection: 'topics',
    timestamps: true,
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    },
    read: 'nearest'
});

const Model = mongoose.model('Topic', topicSchema);
module.exports = Model;