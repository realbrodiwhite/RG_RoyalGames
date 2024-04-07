const express = require('express');
const { isAuthenticated } = require('./middleware/authMiddleware');
const friendController = require('../controllers/friendController');

const router = express.Router();

router.post('/friend/request', isAuthenticated, friendController.sendFriendRequest);
router.put('/friend/accept/:friendId', isAuthenticated, friendController.acceptFriendRequest);
router.get('/friends', isAuthenticated, friendController.listFriends);

module.exports = router;