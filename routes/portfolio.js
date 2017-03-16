const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('../config.json');
const mongoose = require('mongoose');

router.get('/', function(req, res) {
	const Model = mongoose.model('portfolio');
  let obj = {};

  Model
    .find()
    .then(items => {
      obj.works = items;
      res.render('pages/portfolio', obj);
    })

});
router.post('/', function(req, res) {
  // if (!req.body.name || !req.body.email || )
	const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
      user: config.mail.user,
      pass: config.mail.pass
    }
  }));
  const mailOptions = {
    from: `${req.body.email}`,
    to: config.mail.user,
    subject: config.mail.subject,
    text: req
      .body
      .text
      .trim()
      .slice(0, 500)
  };
  transporter.sendMail(mailOptions, function (error, info) {
    //если есть ошибки при отправке - сообщаем об этом
    if (error) {
      return res.json({status: 'При отправке письма произошла ошибка'});
    }
    res.json({status: 'Письмо успешно отправлено'});
  });

})

module.exports = router;