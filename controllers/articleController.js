// controllers/articles.js
const Article = require("../models/articleSchema");
const { badRequestError, notFoundError } = require('../utils/centralizedErrors');

const getSavedArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(badRequestError('Invalid article data'));
      }
      return next(err);
    });
};


const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .then((article) => {
      if (!article) {
        throw ( notFoundError('Article not found'));
      }
      if (article.owner.toString() !== req.user._id) {
        throw new Error('Unauthorized');
      }
      return article.deleteOne().then(() => res.send({ message: 'Article deleted' }));
    })
    .catch(next);
};
module.exports= {getSavedArticles,createArticle,deleteArticle}