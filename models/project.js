const mongoose = require('mogoose');

var projectSchema = new mongoose.Schema({
    title: String,
    projectType: {type: String, enum: ["Graphic Design", "Photography", "Art"],
    shortDesc: String,
    englishDesc: String,
    lithuanianDesc: String,
    projectDate: { type: Date, default: Date.now },
    imgUrl: [String], //feed to img inside of grid element
    location: Number
});

//location: determine position on page via number passed to css variable which gets passed to 
//the grid-column and grid-row properties of new items.. grid-auto-columns/rows set size of empty grid elements in between

module.exports = mongoose.model("Project", projectSchema); 