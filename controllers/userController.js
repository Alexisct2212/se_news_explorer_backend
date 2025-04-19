const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../utils/config")
const User = require('../models/userSchema');
const {badRequestError,unauthorizedError,notFoundError,internalServerError, conflictError} =require("../utils/centralizedErrors")

const createUser = (req, res,next) => {
    const { email, password,name } = req.body;
    bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({ name, email, password: hashedPassword }),
    )
    .then((user) => {
      // Successful user creation
      const userData = { name, email, _id:user._id };
      res.status(201).send(userData);
    })
    .catch((err) => {
      if (err.code === 11000) {
        // Handle duplicate email error
        return next(conflictError("User with this email already exit"));
      }
      if (err.name === "ValidationError") {
        return next(badRequestError('validation failed'));
      }
      return next(internalServerError())
    });


};

const login = (req, res,next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(badRequestError("Email and password are required"));
  }
  return User.findUserByCredentials(email, password)
  .then((user) => {
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.send({ token });
  })
  .catch((err) => {
    if (err.message.includes("Incorrect email") || err.message.includes("Incorrect password")) {
      return next (unauthorizedError("wrong password or email"))
    }
    return next(internalServerError())
  });

};

const getUser = (req, res,next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(notFoundError("User Not Found"))
      }
      if (err.name === "CastError") {
        return next(badRequestError("Wrong User ID"))
      }
      return next(internalServerError())
    });
};
const getCurrentUser = async (req, res, next) => {
  try {
    const users = await User.find({}); // for now, return all users
    res.send(users);
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, login, getUser,getCurrentUser };
