const jwt = require('jsonwebtoken');
const checkIfUserExists = require('./db/user/checkIfUserExists');

const ensureToken = async (req, resp, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader !== undefined) {
    try {
      const token = bearerHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (await checkIfUserExists(decoded.id)) {
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        req.userPass = decoded.password;
        next();
      } else {
        throw new Error('User does not exists');
      }
    } catch (err) {
      resp.status(401).json({
        status: 401,
        error: {
          message: err.message,
        },
        data: null,
      });
    }
  } else {
    resp.status(401).json({
      status: 401,
      error: {
        message: 'No Bearer Token found',
      },
      data: null,
    });
  }
};

const generateToken = (payload) => {
  const userInfo = {
    id: payload.id,
    email: payload.email,
    password: payload.password,
  };
  const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
    expiresIn: '4h',
  });
  return token;
};

module.exports = { generateToken, ensureToken };
