const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'dev-secret' } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  // Check if the token exists and starts with "Bearer "
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization required' });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: 'Invalid token' });
  }

  req.user = payload; // Assign the payload (e.g., { _id }) to the request
  return next();
};
module.exports = auth