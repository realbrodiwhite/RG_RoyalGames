const express = require('express');
const { isAuthenticated } = require('./middleware/authMiddleware');
const gameController = require('../controllers/gameController');

const router = express.Router();

// POST request to create a new game room
router.post('/game/create', isAuthenticated, gameController.createGameRoom);

// PUT request to join an existing game room
router.put('/game/join/:roomId', isAuthenticated, gameController.joinGameRoom);

// GET request to get the current game state
router.get('/game/state/:roomId', isAuthenticated, gameController.getGameState);
module.exports = router;