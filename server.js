// require necessary NPM packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

// require route files
const exampleRoutes = require('./app/routes/example_routes');
const userRoutes = require('./app/routes/user_routes');
const chatRoomRoutes = require('./app/routes/chatroom_routes');
const messageRoutes = require('./app/routes/message_routes');

// require middleware
const errorHandler = require('./lib/error_handler');
const replaceToken = require('./lib/replace_token');
const requestLogger = require('./lib/request_logger');

// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require('./config/db');

// require configured passport authentication middleware
const auth = require('./lib/auth');

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 4741;
const clientDevPort = 7165;

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true
});

// instantiate express application object
const app = express();

// instantiate socket.IO server
const server = http.createServer(app);
const io = socketio(server);

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}`
  })
);

// define port for API to run on
const port = process.env.PORT || serverDevPort;

// this middleware makes it so the client can use the Rails convention
// of `Authorization: Token token=<token>` OR the Express convention of
// `Authorization: Bearer <token>`
app.use(replaceToken);

// register passport authentication middleware
app.use(auth);

// add `express.json` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(express.json());
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }));

// log each request as it comes in for debugging
app.use(requestLogger);

// register route files
app.use(exampleRoutes);
app.use(userRoutes);
app.use(messageRoutes);
app.use(chatRoomRoutes);

// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler);

io.on('connection', socket => {
  console.log('a user connected');

  const countClientsRoom = room => {
    // logic attrib to: https://github.com/googlecodelabs/webrtc-web/issues/5
    const clientsInRoom = io.nsps['/'].adapter.rooms[room];
    const numClients =
      clientsInRoom === undefined
        ? 0
        : Object.keys(clientsInRoom.sockets).length;
    io.to(room).emit('count', numClients);
  };

  socket.on('join chatroom', room => {
    socket.join(room);
    countClientsRoom(room, socket);
    socket.broadcast.to(room).emit('join success');
  });

  socket.on('send chat message', room => {
    socket.broadcast.to(room).emit('new chat message');
  });

  socket.on('leave chatroom', room => {
    countClientsRoom(room, socket);
    socket.to(room).emit('user left chatroom');
    socket.leave(room);
  });

  socket.on('request count', room => {
    countClientsRoom(room, socket);
  });

  socket.on('disconnect', () => {
    io.emit('user force dc');
  });
});

// run API on designated port (4741 in this case)
server.listen(port, () => {
  console.log('listening on port ' + port);
});

// needed for testing
module.exports = app;
