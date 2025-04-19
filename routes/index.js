const express = require('express');

const router = express.Router();
const { createUser, login } = require('../controllers/userController');
const articleRoutes = require("./articles");
const userRouter = require("./users")
const {notFoundError} = require("../utils/centralizedErrors")

router.use("/articles", articleRoutes);
router.use("/users",userRouter);

router.post('/signup', createUser);
router.post('/signin', login);

router.use((req,res,next) => {
  next(notFoundError("page not found"));
});
module.exports = router;
