const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

router.get('/', function (req, res) {
  var obj = {
    title: 'Загрузка картинки'
  };
  res.render('pages/upload', obj);
});

router.post('/', function (req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = config.upload;
  form.parse(req, function (err, fields, files) {
    if (err) {
      //res.statusCode = 500;
      return res.json({status: 'Не удалось загрузить картинку'});
    }
    fs
      .rename(files.photo.path, path.join(config.upload, files.photo.name), function (err) {
        if (err) {
          fs.unlink(path.join(config.upload, files.photo.name));
          fs.rename(files.photo.path, files.photo.name);
        }
        res.json({status: 'Картинка успешно загружена'});
      });
  });
});

module.exports = router;