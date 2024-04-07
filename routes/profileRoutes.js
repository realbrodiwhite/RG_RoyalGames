const express = require('express');
const { isAuthenticated } = require('./middleware/authMiddleware');
const profileController = require('../controllers/profileController');

const router = express.Router();

// GET request to view profile
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    await profileController.getProfile(req, res);
    console.log('Profile fetched successfully.');
  } catch (error) {
    console.error('Error fetching user profile:', error.message, error.stack);
    res.status(500).send('Internal Server Error');
  }
});

// PUT request to update profile, using method-override for PUT
router.put('/profile/update', isAuthenticated, async (req, res) => {
  try {
    await profileController.updateProfile(req, res);
    console.log('Profile updated successfully.');
  } catch (error) {
    console.error('Error updating user profile:', error.message, error.stack);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;