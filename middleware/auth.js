const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/config');
const { unauthorizedError } = require('../utils/centralizedErrors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(unauthorizedError('Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET); // uses your secret
  } catch (err) {
    return next(unauthorizedError('Invalid token'));
  }

  req.user = payload;
  return next();
};

module.exports = auth