module.exports = ({ env }) => ({
  connection: {
    client: 'mongoose',
    connection: {
      uri: env('DATABASE_URI'),
      database: env('DATABASE_NAME'),
    },
    options: {
      authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
      ssl: env.bool('DATABASE_SSL', true),
    },
  },
});