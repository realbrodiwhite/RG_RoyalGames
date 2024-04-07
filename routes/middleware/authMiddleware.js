const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    console.log(`User ${req.session.userId} is authenticated`);
    return next(); // User is authenticated, proceed to the next middleware/route handler
  } else {
    console.error('User is not authenticated');
    return res.status(401).send('You are not authenticated'); // User is not authenticated
  }
};

module.exports = {
  isAuthenticated
};