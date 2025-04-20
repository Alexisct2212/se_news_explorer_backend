const express = require('express');

const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/userController');
const articleRoutes = require("./articles");
const userRouter = require("./users")
const {notFoundError} = require("../utils/centralizedErrors")

router.use('/articles', articleRoutes);
router.use('/users',userRouter);

router.post("/signin",celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(2),
    email:Joi.string().required().email(),

  }),}), login);

router.post("/signup",celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(2),
    email:Joi.string().required().email(),
    name:Joi.string().required().min(2).max(30),
    avatar:Joi.string().uri(),
  }),}), createUser);

router.use((req,res,next) => {
  next(notFoundError("page not found"));
});
module.exports = router;
