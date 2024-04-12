const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  gameRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'GameRoom', required: true } // Link each message to a specific game room
});

messageSchema.pre('save', function(next) {
  console.log(`Saving message from ${this.sender} in game room ${this.gameRoom}`);
  next();
});

messageSchema.post('save', function(doc, next) {
  console.log(`Message saved: ${doc._id}`);
  next();
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;