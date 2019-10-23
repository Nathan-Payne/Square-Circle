const mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    title: String,
    projectType: {type: String, enum: ["Graphic Design", "Photography", "Art"]},
    shortDesc: String,
    englishDesc: String,
    lithuanianDesc: String,
    projectDate: { type: Date, default: Date.now },
    imgUrl: [String], //feed cloudinary url to img inside of grid element
    imgId: [String],
    xPosition: Number,
    yPosition: Number
});

//location: determine position on page via number passed to css variable which gets passed to 
//the grid-column and grid-row properties of new items.. grid-auto-columns/rows set size of empty grid elements in between
//OR
//grid is pre set to 1 column - width fills content space, assign class to set justify and align-self properties
//based on location parameter in database... use absolute position to adjust

module.exports = mongoose.model("Project", projectSchema); 