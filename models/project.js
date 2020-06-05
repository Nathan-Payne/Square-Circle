const mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
	title: String,
	titleLith: {
		type: String,
		default: function() {
			return this.title;
		}
	},
	projectType: { type: String, enum: [ 'Graphic Design', 'Photography', 'Art' ] },
	shortDesc: String,
	englishDesc: String,
	lithuanianDesc: String,
	projectDate: { type: Date, default: Date.now },
	imgUrl: [ String ], //feed cloudinary url to img inside of grid element
	imgId: [ String ],
	xPosition: Number,
	yPosition: Number,
	xFine: { type: Number, default: 0 },
	yFine: { type: Number, default: 0 }
});

module.exports = mongoose.model('Project', projectSchema);
