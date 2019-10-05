const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); 
const passport = require('passport');   
const LocalStrategy = require('passport-local');
const methodOverride = require("method-override");
const Admin = require('./models/admin');
const PORT = process.env.PORT || 5000

const indexRoutes = require('./routes/index');
const projectRoutes = require('./routes/project');

app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //express.static(root, [options]) - specifies dir from which to serve static assests (e.g. img/CSS/JS)
app.use(methodOverride("_method"));

//PASSPORT CONFIG
app.use(require('express-session')({
    secret: "PawParty",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Admin.authenticate()));   
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser()); 

//MONGODB CONFIG
let url = process.env.SQUARECIRCLE_URL || 'mongodb://localhost/squarecircle';
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log(`Connected to ${url}`);
}).catch(err => {
    console.log("Initial mongoose connection error:", err.message);
});
mongoose.connection.on('error', err => {
    console.log("Ongoing squarecircle database error:", err.message)
});


//Project SHOW page
app.get("/graphic-design", (req, res) => {
    res.render('graphicDesign')
});

//Project SHOW page
app.get("/photography", (req, res) => {
    res.render('photography')
});

//Project SHOW page
app.get("/art", (req, res) => {
    res.render('art')
});


app.use(indexRoutes);
// app.use(projectRoutes);

app.listen(PORT, () => console.log(`Listening on ${ PORT } \n============== SQUARE THAT CIRCLE ==============`))
