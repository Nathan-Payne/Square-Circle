const mongoose = require('mogoose');

var projectSchema = new mongoose.Schema({
    title: String,
    projectType: {type: String, enum: ["Graphic Design", "Photography", "Art"],
    shortDesc: String,
    englishDesc: String,
    lithuanianDesc: String,
    projectDate: { type: Date, default: Date.now },
    imgUrl: [String], //feed to img inside of grid element
    location: Number //determine position on page via class added to div element in grid
});


module.exports = mongoose.model("Project", projectSchema); 