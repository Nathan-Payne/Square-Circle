const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var adminSchema = new mongoose.Schema({
    username: String,
    password: String,
});

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin", adminSchema);