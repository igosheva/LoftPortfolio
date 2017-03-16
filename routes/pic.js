const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function(req, res) {
  const Model = mongoose.model('pic');

  Model.find().then(items => {
    Object.assign(obj, {items: items});
    res.render('pages/pic', obj);
  });

});

module.exports = router;