const mongoose = require('mogoose');

var projectSchema = new mongoose.Schema({
    title: String,
    projectType: {type: String, enum: ["Graphic Design", "Photography", "Art"],
    shortDescription: String,
    
});


module.exports = mongoose.model("Project", projectSchema); 