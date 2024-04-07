const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      console.log('Profile fetch failed: User not found');
      return res.status(404).send('User not found');
    }
    console.log(`Profile fetched for user: ${user.username}`);
    res.render('profile', { user });
  } catch (error) {
    console.error('Error fetching user profile:', error.message, error.stack);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateProfile = async (req, res) => {
  const { username, email, legalName, address, city, state, zipCode } = req.body;
  console.log(`Attempting to update profile for user ID: ${req.session.userId} with data:`, req.body);
  try {
    const updatedUser = await User.findByIdAndUpdate(req.session.userId, {
      username,
      email,
      legalName,
      address,
      city,
      state,
      zipCode
    }, { new: true });
    if (!updatedUser) {
      console.log('Profile update failed: User not found');
      return res.status(404).send('User not found');
    }
    console.log(`Profile updated for user: ${updatedUser.username}`);
    res.redirect('/profile');
  } catch (error) {
    console.error('Error updating user profile:', error.message, error.stack);
    res.status(500).send('Internal Server Error');
  }
};