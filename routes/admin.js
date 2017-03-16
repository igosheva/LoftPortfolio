const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const config = require('../config.json');
const mongoose = require('mongoose');

function isAdmin(req, res, next) {
  if (!req.session.isAdmin) res.redirect('/');
  else next();
}

router.get('/', isAdmin, function(req, res) {
  const Model = mongoose.model('skills');

  Model.find({}, {_id: false, __v: false})
    .then(
      (items) => {
        res.render('pages/admin', {skills: items})
      },
      (e) => {
        const error = Object
          .keys(e.errors)
          .map(key => e.errors[key].message)
          .join(', ');
        res.json({status: 'Ошибка БД: ' + error});
      }
    );
})

router.post('/skills', isAdmin, function(req, res) {
  const Model = mongoose.model('skills');
  let models = [];

  Object.keys(req.body).map(category => ({
    category: category,
    items: Object.keys(req.body[category]).map(i => ({
      name: i,
      value: req.body[category][i]
    }))
  })).forEach(skill => models.push(new Model(skill)));

  Model.remove({}).then(
    () => {
      Model.insertMany(models).then(
        (i) => {return res.json({status: 'Умения обновлены'});},
        (e) => {
          const error = Object
            .keys(e.errors)
            .map(key => e.errors[key].message)
            .join(', ');
          res.json({status: 'При обновлении произошла ошибка: ' + error});
        }
      )
    },
    (e) => {
      const error = Object
        .keys(e.errors)
        .map(key => e.errors[key].message)
        .join(', ');
      res.json({status: 'Произошла ошибка: ' + error});
    }
  );
})
router.post('/portfolio', isAdmin, function(req, res) {
	let form = new formidable.IncomingForm();
  const Model = mongoose.model('portfolio');

  form.uploadDir = config.upload;
  form.parse(req, function (err, fields, files) {
    if (err) {
      return res.json({status: 'Не удалось загрузить картинку'});
    }
    fs.rename(files.photo.path, path.join(config.upload, files.photo.name), function (err) {
      if (err) {
        fs.unlink(path.join(config.upload, files.photo.name));
        fs.rename(files.photo.path, files.photo.name);
      }
      let dir = config.upload.substr(config.upload.indexOf('/'));
      let item = new Model({
        title: fields.name,
        teh: fields.teh,
        link: fields.link,
        picture: files.photo.name
      })
        .save()
        .then(
          (i) => {return res.json({status: 'Работа добавлена'});},
          (e) => {
            const error = Object
              .keys(e.errors)
              .map(key => e.errors[key].message)
              .join(', ');
            res.json({status: 'При добавление записи произошла ошибка: ' + error});
          }
        )
    });
  });
})
router.post('/blog', isAdmin, function(req, res) {
	const Model = mongoose.model('blog');
  let item = new Model({
    title: req.body.name,
    date: req.body.date,
    body: req.body.text
  })
    .save()
    .then(
      (i) => {return res.json({status: 'Запись добавлена'});},
      (e) => {
        const error = Object
          .keys(e.errors)
          .map(key => e.errors[key].message)
          .join(', ');
        res.json({status: 'При добавление записи произошла ошибка: ' + error});
      }
    )
})

module.exports = router;