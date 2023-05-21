const mongoose = require('mongoose');

const profilePicSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'twitter_users',
    required: true
  },
  imagePath: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ProfilePic', profilePicSchema);

