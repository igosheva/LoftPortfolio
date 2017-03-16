const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkSchema = new Schema({
	title: {
		type: String,
    required: [true, 'Укажите название']
	},
	teh: {
		type: String,
    required: [true, 'Укажите технологии']
	},
	link: {
		type: String,
    required: [true, 'Укажите ссылку']
	},
	picture: {
    type: String
  }
})

mongoose.model('portfolio', WorkSchema);