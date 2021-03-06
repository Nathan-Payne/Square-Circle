const express = require('express');
const router = express.Router();
const passport = require('passport');
const Admin = require('../models/admin');
const Project = require('../models/project');

//=========CLOUDINARY CONFIG==========
const cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

//HOMEPAGE
router.get('/', async (req, res) => {
	try {
		let randomInt = (n) => Math.floor(Math.random() * n);
		let projects = [];
		let allProjects = await Project.find();
		for (let p = 0; p < 4; p++) {
			projects.push(allProjects[randomInt(allProjects.length)]);
		}
		res.render('home', { projects: projects, cloudinary: cloudinary });
	} catch (err) {
		console.error(err);
	}
});

//SHOW info pages
router.get('/about', (req, res) => {
	res.render('about');
});

router.get('/concept', (req, res) => {
	res.render('concept');
});

//===============REGISTER NEW ADMIN===============
//Show registration
router.get('/register', (req, res) => {
	res.render('register');
});
//create admin
router.post('/register', (req, res) => {
	let newAdmin = new Admin({
		username: req.body.username
	});
	if (req.body.adminCode === process.env.REGISTRATION_ADMIN_CODE) {
		Admin.register(newAdmin, req.body.password, (err, admin) => {
			if (err) {
				console.error(err);
				return res.redirect('/register');
			}
			passport.authenticate('local')(req, res, function() {
				res.redirect('/');
			});
		});
	} else {
		res.redirect('/register');
	}
});

//=========LOGIN============
router.get('/login', (req, res) => {
	res.render('login');
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
	}),
	(req, res) => {}
);

//=======LOGOUT===========
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
