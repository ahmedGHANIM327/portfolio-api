const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// Session config
module.exports = function (app) {
  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      store: new MongoDBStore({
        uri: process.env.DB_CONNECTION_URL,
        collection: 'sessions'
      }),
      cookie: {
        secure: false // Changez à true en production si vous utilisez HTTPS
      }
    })
  );
};
