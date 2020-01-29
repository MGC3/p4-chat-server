// Express docs: http://expressjs.com/en/api.html
const express = require('express');
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport');

// pull in Mongoose model for chatrooms
const ChatRoom = require('../models/chatroom');

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors');

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404;
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership;

// this is middleware that will remove blank fields from `req.body`, e.g.
// { message: { title: '', text: 'foo' } } -> { message: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields');
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false });

// instantiate a router (mini app that only handles routes)
const router = express.Router();

// CREATE
// POST /messages
router.post('/messages', requireToken, (req, res, next) => {
  // set owner of new comment to be current user
  req.body.message.owner = req.user.id;
  // use the chatRoomId provided by the frontend and search for the ChatRoom
  ChatRoom.findById(req.body.message.chatRoomId)
    .then(chatroom => {
      chatroom.messages.push(req.body.message);
      return chatroom.save();
    })
    .then(chatroom => {
      res.status(201).json({ chatroom: chatroom.toObject() });
    })
    .catch(next);
});

module.exports = router;
