const mongoose = require('mongoose');

const gameRoomSchema = new mongoose.Schema({
  gameType: { type: String, required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxPlayers: { type: Number, required: true },
  isFull: { type: Boolean, default: false },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

const GameRoom = mongoose.model('GameRoom', gameRoomSchema);

module.exports = GameRoom;