const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function(req, res) {
	const Model = mongoose.model('skills');

	Model.find().then(items => {
		res.render('pages/about', {skills: items})
	})
})

module.exports = router;