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
//create admin
router.post("/register", (req, res)=>{
    let newAdmin = new Admin({
        username: req.body.username
    });
    if(req.body.adminCode === process.env.REGISTRATION_ADMIN_CODE){
        Admin.register(newAdmin, req.body.password, (err, admin)=>{
            if(err){
                console.error(err)
                return res.redirect("/register")
            }
            passport.authenticate("local")(req, res, function(){
                res.redirect("/");
            });
        });
    } else {
        res.redirect("/register");
    };
});



module.exports = router;