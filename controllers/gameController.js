const GameRoom = require('../models/GameRoom');

exports.createGameRoom = async (req, res) => {
  try {
    const { gameType, maxPlayers } = req.body;
    // Check if the gameType and maxPlayers are provided
    if (!gameType || !maxPlayers) {
      console.log('Missing gameType or maxPlayers in request');
      return res.status(400).send({ message: 'Missing gameType or maxPlayers' });
    }
    const gameRoom = new GameRoom({ gameType, maxPlayers, players: [req.session.userId] });
    await gameRoom.save();
    console.log(`Game room created: ${gameRoom.id}`);
    res.status(201).send(gameRoom);
  } catch (error) {
    console.error('Error creating game room:', error.message, error.stack);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.joinGameRoom = async (req, res) => {
  try {
    const gameRoom = await GameRoom.findById(req.params.roomId);
    if (!gameRoom) {
      console.log('Game room not found');
      return res.status(404).send({ message: 'Game room not found' });
    }
    if (gameRoom.isFull) {
      console.log('Game room is full');
      return res.status(400).send({ message: 'Game room is full' });
    }
    // Check if the user is already in the game room
    if (gameRoom.players.includes(req.session.userId)) {
      console.log('User is already in the game room');
      return res.status(400).send({ message: 'User is already in the game room' });
    }
    gameRoom.players.push(req.session.userId);
    gameRoom.isFull = gameRoom.players.length >= gameRoom.maxPlayers;
    await gameRoom.save();
    console.log(`User ${req.session.userId} joined game room: ${gameRoom.id}`);
    res.send(gameRoom);
  } catch (error) {
    console.error('Error joining game room:', error.message, error.stack);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.getGameState = async (req, res) => {
  try {
    const { roomId } = req.params;
    const gameRoom = await GameRoom.findById(roomId).populate('players', '-password');
    if (!gameRoom) {
      console.log(`Game room with ID ${roomId} not found`);
      return res.status(404).send({ message: 'Game room not found' });
    }
    console.log(`Game state retrieved for room: ${roomId}`);
    res.status(200).send(gameRoom);
  } catch (error) {
    console.error('Error retrieving game state:', error.message, error.stack);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};