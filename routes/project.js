//NOTES
//can use Project.find({}).project({_id: 0}) to select certain variables
//Projections determine which fields are passed from the database.

//can render page and pass database variable directly to html + use in script tags
//

const express = require("express");
const router = express.Router();
const Project = require("../models/project");

//=========MULTIFILE UPLOAD VIA MULTER=========
//config - memory storage may be needed if host doesn't allow disk access
const multer = require("multer");
var storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, Date.now() + "-" + file.originalname);
    }
});
var upload = multer({storage: storage});
//=========CLOUDINARY CONFIG==========
const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//==========ROUTES==================================
//=======Create new project========
router.get("/create", (req, res)=>{
    res.render("create"); 
});

router.post("/create", upload.single('image'), (req, res)=>{
    cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'square_circle/', 
        public_id: req.body.project.title
    }, (err, result)=>{
        if(err){
            console.error(err);
            return res.redirect('back');
        }
        req.body.project.imgUrl = result.secure_url;
        req.body.project.imgId = result.public_id;
        Project.create(req.body.project, (err, newProject)=>{
            if(err){
                console.log(err);
                return res.redirect('back');
            }
            res.send(newProject);
        });
    });
});

//=======Show list of projects in each category========
//.find({options}) - 1st option allows conditions to be set for data retrieved from database
//GET routes are passed only the projects of the relevant type
//GRAPHIC DESIGN SHOW
router.get("/graphic-design", async (req, res) => {
    try{
        let projects = await Project.find({projectType: "Graphic Design"});
        res.render('graphicDesign', {projects: projects, cloudinary: cloudinary});
    } catch (err) {
        console.error(err);
    };
});
//PHOTOGRAPHY SHOW
router.get("/photography", async (req, res) => {
    try{
        let projects = await Project.find({projectType: "Photography"});
        res.render('photography', {projects: projects, cloudinary: cloudinary});
    } catch (err) {
        console.error(err);
    };
});
//ART SHOW
router.get("/art", async (req, res) => {
    try{
        let projects = await Project.find({projectType: "Art"});
        res.render('art', {projects: projects, cloudinary: cloudinary});
    } catch (err) {
        console.error(err);
    };
});

//=======PROJECT SHOW ROUTE (individual)=============
router.get("/:id", (req, res)=>{
    Project.findById(req.params.id, (err, foundProject)=>{
        if(err || !foundProject){
            console.log(err || "could not find that project");
            return res.redirect('back');
        }
        res.render('project', {project: foundProject, cloudinary: cloudinary});
    });
});

//============EDIT PROJECT ROUTE===========
router.get("/:id/edit", async (req, res)=>{
    try {
        let foundProject = await Project.findById(req.params.id);
        res.render('edit', {project: foundProject});
    } catch (err){
        console.error(err);
    };
});




module.exports = router;