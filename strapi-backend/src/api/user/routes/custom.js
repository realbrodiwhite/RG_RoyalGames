module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/auth/local/register',
      handler: 'auth.local.register',
      config: {
        policies: ['global::verifyAge'],
        auth: false,
      },
    },
    // Add other custom routes here
  ],
};