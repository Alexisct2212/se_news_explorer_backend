const router = require("express").Router();
const { getSavedArticles, createArticle, deleteArticle } = require("../controllers/articleController");
const auth = require("../middleware/auth");


router.get("/", auth,getSavedArticles);
router.post("/", auth,createArticle);
router.delete("/:articleId", auth,deleteArticle);

module.exports = router;
