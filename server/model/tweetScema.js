const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const tweetSchema = new mongoose.Schema({
    author: { type: ObjectId, ref:"twitter_users" },
    content: { type: String, required: true },
    media: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tweet', tweetSchema);
