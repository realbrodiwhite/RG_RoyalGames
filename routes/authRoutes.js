const express = require('express');
const axios = require('axios');
const router = express.Router();

const STRAPI_BASE_URL = 'http://localhost:1337';

router.get('/auth/register', (req, res) => {
  res.render('register');
});

router.post('/auth/register', async (req, res) => {
  try {
    const response = await axios.post(`${STRAPI_BASE_URL}/auth/local/register`, {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      birthday: req.body.birthday,
      legalName: req.body.legalName,
      location: `${req.body.address}, ${req.body.city}, ${req.body.state}, ${req.body.zipCode}`,
    });
    console.log(`New user registered: ${response.data.user.username}`);
    res.redirect('/auth/login');
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Registration error:', error.response.data.message);
      console.error(error.response.data);
      res.status(error.response.status).send(error.response.data.message);
    } else {
      console.error('Registration error:', error.message);
      console.error(error.stack);
      res.status(500).send("An error occurred during registration.");
    }
  }
});

router.get('/auth/login', (req, res) => {
  res.render('login');
});

router.post('/auth/login', async (req, res) => {
  try {
    const response = await axios.post(`${STRAPI_BASE_URL}/auth/local`, {
      identifier: req.body.username,
      password: req.body.password,
    });
    req.session.jwt = response.data.jwt;
    req.session.userId = response.data.user.id;
    console.log(`User logged in: ${response.data.user.username}`);
    res.redirect('/');
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Login error:', error.response.data.message);
      console.error(error.response.data);
      res.status(error.response.status).send(error.response.data.message);
    } else {
      console.error('Login error:', error.message);
      console.error(error.stack);
      res.status(500).send("An error occurred during login.");
    }
  }
});

router.get('/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error during session destruction:', err);
      console.error(err.stack);
      return res.status(500).send('Error logging out');
    }
    console.log('User logged out successfully');
    res.redirect('/auth/login');
  });
});

module.exports = router;