//NOTES
//can use Project.find({}).project({_id: 0}) to select certain variables
//Projections determine which fields are passed from the database.

//can render page and pass database variable directly to html + use in script tags
//

const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const asyncMiddleware = require("../middleware/index");


//=======Create new project========
router.get("/create", (req, res)=>{
    res.render("create"); 
});


router.post("/create", (req, res)=>{
    Project.create(req.body.project, (err, newProject)=>{
        if(err){
            console.log(err);
            return res.redirect('back');
        }
        res.send(newProject);
    });
});


//=======Show list of projects in each category========
//.find({options}) - 1st option allows conditions to be set for data retrieved from database
//GET routes are passed only the projects of the relevant type
//GRAPHIC DESIGN SHOW
router.get("/graphic-design", async (req, res) => {
    try{
        let projects = await Project.find({projectType: "Graphic Design"});
        res.render('graphicDesign', {projects: projects});
    } catch (err) {
        console.error(err);
    };
});

//PHOTOGRAPHY SHOW
router.get("/photography", async (req, res) => {
    try{
        let projects = await Project.find({projectType: "Photography"});
        res.render('photography', {projects: projects});
    } catch (err) {
        console.error(err);
    };
});

//ART SHOW
router.get("/art", async (req, res) => {
    try{
        let projects = await Project.find({projectType: "Art"});
        res.render('art', {projects: projects});
    } catch (err) {
        console.error(err);
    };
});




module.exports = router;