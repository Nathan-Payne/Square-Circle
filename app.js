const dotenv = require('dotenv');
dotenv.config(); //ensure .env file is present in root dir of project
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const Admin = require('./models/admin');
const PORT = process.env.PORT || 5000;

const indexRoutes = require('./routes/index');
const projectRoutes = require('./routes/project');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')); //express.static(root, [options]) - specifies dir from which to serve static assests (e.g. img/CSS/JS)
app.use(methodOverride('_method'));

//PASSPORT CONFIG
app.use(
	require('express-session')({
		secret: process.env.EXPRESS_SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());

//custom middleware
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

//MONGODB CONFIG
mongoose.set('useUnifiedTopology', true);
let url = 'mongodb://localhost:27017/squarecircle';
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => {
		console.log(`Connected to ${url}`);
	})
	.catch((err) => {
		console.log('Initial mongoose connection error:', err.message);
	});
mongoose.connection.on('error', (err) => {
	console.log('Ongoing squarecircle database error:', err.message);
});

app.use(indexRoutes);
app.use(projectRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT} \n============== SQUARE THAT CIRCLE ==============`));

// MEETING NOTES
// add random projects to homepage in random places
// translucent square + translucent circle containing collage of random project pics - clickable
// optimise images to use lazy load/pagination and html picture tags with various image sizes and qualities
// blank image placeholder before image load / ultra low res version load with priority
// internal links for pink text on about page

// AFTER LIVE SITE UP
// HOST ON VPS - dwn squarecircleUser (DONE)
// check compatibility - polyfill if neccessary
// set up nginx ssl options with domain (port 443) (if requested)

// Possible future updates
// add language tab to about / concept pages - require translation
// may need to rewrite password functionality using bcrypt or alternative to passportJS and salting in mongodb
// ensure responsive for 2k/4k (font size, image sizing/quality)
// semantic urls / permalinks (each projects title should appear in URL for that project page)
