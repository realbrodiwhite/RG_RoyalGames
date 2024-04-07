const User = require('../models/User');

exports.sendFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.session.userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).send('Friend not found');
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).send('Already friends');
    }

    user.friends.push(friendId);
    await user.save();

    console.log(`Friend request sent from user ${req.session.userId} to user ${friendId}`);
    res.send('Friend request sent successfully');
  } catch (error) {
    console.error('Error sending friend request:', error.message, error.stack);
    res.status(500).send('Internal Server Error');
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.params;
    const user = await User.findById(req.session.userId);

    if (user.friends.includes(friendId)) {
      return res.status(400).send('Already friends');
    }

    user.friends.push(friendId);
    await user.save();

    const friend = await User.findById(friendId);
    if (!friend.friends.includes(req.session.userId)) {
      friend.friends.push(req.session.userId);
      await friend.save();
    }

    console.log(`Friend request accepted between user ${req.session.userId} and user ${friendId}`);
    res.send('Friend request accepted successfully');
  } catch (error) {
    console.error('Error accepting friend request:', error.message, error.stack);
    res.status(500).send('Internal Server Error');
  }
};

exports.listFriends = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).populate('friends');

    console.log(`Listing friends for user ${req.session.userId}`);
    res.render('friendsList', { friends: user.friends });
  } catch (error) {
    console.error('Error listing friends:', error.message, error.stack);
    res.status(500).send('Internal Server Error');
  }
};