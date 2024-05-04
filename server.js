// Load environment variables
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override'); // Added for method override
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require('./routes/profileRoutes'); // Added profile routes
const gameRoutes = require('./routes/gameRoutes'); // Import the game routes
const friendRoutes = require('./routes/friendRoutes'); // Import the friend routes
const http = require('http');
const socketIo = require('socket.io');
const Message = require('./models/Message'); // Import the Message model
const User = require('./models/User'); // Import the User model for friend system
const GameRoom = require('./models/GameRoom'); // Import the GameRoom model for chat feature

if (!process.env.DATABASE_URL || !process.env.SESSION_SECRET) {
  console.error("Error: config environment variables not set. Please create/edit .env configuration file.");
  process.exit(-1);
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Ensure methodOverride middleware is correctly placed right after body parsing middleware
app.use(methodOverride('_method')); // Correctly using method-override for PUT requests

// Setting the templating engine to EJS
app.set("view engine", "ejs");

// Serve static files
app.use(express.static("public"));

// Database connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(`Database connection error: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  });

// Session configuration with connect-mongo
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  }),
);

app.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
  console.error(error.stack);
});

// Logging session creation and destruction
app.use((req, res, next) => {
  const sess = req.session;
  // Make session available to all views
  res.locals.session = sess;
  if (!sess.views) {
    sess.views = 1;
    console.log("Session created at: ", new Date().toISOString());
  } else {
    sess.views++;
    console.log(
      `Session accessed again at: ${new Date().toISOString()}, Views: ${sess.views}, User ID: ${sess.userId || '(unauthenticated)'}`,
    );
  }
  next();
});

// Authentication Routes
app.use(authRoutes);

// Profile Routes - Added for profile management
app.use(profileRoutes);

// Use game routes
app.use(gameRoutes);

// Use friend routes
app.use(friendRoutes);

// Root path response
app.get("/", (req, res) => {
  res.render("index");
});

// If no routes handled the request, it's a 404
app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(`Unhandled application error: ${err.message}`);
  console.error(err.stack);
  res.status(500).send("There was an error serving your request.");
});

const server = http.createServer(app);
const io = socketIo(server);

// Socket.IO logic for real-time updates
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`A user joined room: ${roomId}`);
  });

  socket.on('sendMessage', ({ roomId, message }) => {
    // Save the message to the database
    const newMessage = new Message({
      sender: message.sender, // Assuming message object has sender property
      content: message.content,
      roomId: roomId // Correctly adding roomId to associate messages with game rooms
    });

    newMessage.save().then(() => {
      io.to(roomId).emit('messageReceived', message);
      console.log(`Message saved and sent in room: ${roomId}, message: ${message.content}`);
    }).catch((err) => {
      console.error('Error saving message:', err.message);
      console.error(err.stack);
    });
  });

  socket.on('updateRoomPlayers', ({ roomId, players }) => {
    io.to(roomId).emit('playersUpdated', players);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Replace app.listen with server.listen
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});