const { logger } = require('./logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (process.env.NODE_ENV === 'development') {
    res.status(500).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = errorHandler;