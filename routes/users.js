const router = require("express").Router();
const {getUser} = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/me",auth,getUser);

module.exports = router;