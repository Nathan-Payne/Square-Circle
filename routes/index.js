const express = require('express');
const router = express.Router();
const passport = require('passport');
const Admin = require('../models/admin');
const Project = require('../models/project');


//HOMEPAGE
router.get("/", (req, res) => {
    res.render('home')
});

//SHOW info pages
router.get("/about", (req, res) => {
    res.render('about')
});

router.get("/concept", (req, res) => {
    res.render('concept')
});

//===============REGISTER NEW ADMIN===============
//Show registration
router.get("/register", (req, res) => {
    res.render('register');
});




module.exports = router;