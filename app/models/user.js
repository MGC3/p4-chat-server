const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    screenName: {
      type: String,
      required: true,
      unique: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    token: String
  },
  {
    timestamps: true,
    toObject: {
      // remove `hashedPassword` field when we call `.toObject`
      transform: (_doc, user) => {
        delete user.hashedPassword;
        return user;
      }
    }
  }
);

// TODO: update imports everywhere else, after copying this:
// for getting screennames on to messages, if going mongo way
// module.exports = messageSchema;
module.exports = mongoose.model('User', userSchema);
