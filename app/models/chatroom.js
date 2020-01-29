const mongoose = require('mongoose');
const messageSchema = require('./message');

const chatRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    messages: [messageSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
