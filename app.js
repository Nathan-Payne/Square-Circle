require('dotenv').config();
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

app.use(indexRoutes);
app.use(projectRoutes);

app.listen(PORT, () => console.log(`Listening on ${ PORT } \n============== SQUARE THAT CIRCLE ==============`));

// MEETING NOTES
// animate hamburger menu, move left nav inside for 560px breakpoint
// sticky nav menu stops being sticky at the opposite edge of its containing block - need to fix body height on mobile
// scroll on home page should do something - e.g. show most recent projects
// add a button to add a row to the top of the grid - will need to change every entry in db xy position, rare admin task (time not a concern)
// add check if logged in middleware
// add edit project button to redirect to edit page when logged in
// ensure responsive for 4k (check font size, image sizing)
// check compatibility on other browsers
// on mobile dont load all projects at once, add a scroll point at which the next 5-10 load
// lower img quality for low resolutions
// move js script for thumbnails into separate file
// accessibility


// FUN STUFF
// animate nav bar to slide out of small logo to the right and down on page load
// scroll on homepage   - animate logo to resize and move to logo in top left?
//                      - animate circle to radial wipe in then fade squarecircle text on top
// add offsets to central axis for each project on small-medium screen sizes?