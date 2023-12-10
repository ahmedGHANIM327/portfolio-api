const { dbLogger } = require('../logs/winston.logs');
const { prop } = require('ramda');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  dbLogger.error(prop('message', err));
  res.status(500).json({ ok: false, error: prop('message', err) });
};

module.exports = errorHandler;
