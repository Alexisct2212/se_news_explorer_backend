const router = require("express").Router();
const { getSavedArticles, createArticle, deleteArticle } = require("../controllers/articleController");
const auth = require("../middleware/auth");


router.get("/", auth,getSavedArticles);
router.put("/articleId/saved", auth,createArticle);
router.delete("/:articleId/delete", auth,deleteArticle);

module.exports = router;
