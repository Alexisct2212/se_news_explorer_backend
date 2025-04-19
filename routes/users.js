const router = require('express').Router();
const {getUser,getCurrentUser} = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/",getCurrentUser)
router.get("/me",auth,getUser);

module.exports = router;