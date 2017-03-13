const express = require('express');
const router = express.Router();
const article = require('../source/data/article');

router.get('/', function(req, res) {
  var obj = {title: "Главная страница"};
  res.render('pages/index', obj);
});

router.get('/blog', function(req, res) {
  var obj = {title: "Blog"};
  Object.assign(obj, article);
  res.render('pages/blog', obj);
});

module.exports = router;