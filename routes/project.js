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

router.post("/create", upload.array('image', 6), async (req, res)=>{
    //use a for loop which ends when size of upload array is reached
    //cloudinary doesnt support multiple file upload so have to iterate through
    //multer array one by one.. will also need to update project model 
    //(to include arrays for images and id's) and thumnail templates 
    //(to use first image) and edit route/view and project view to show all images
    var filePaths = req.files.map(file => file.path) //map creates new array from funct acting on elements of existing array
    req.body.project.imgUrl = [];
    req.body.project.imgId = [];
    for (let i=0; i<filePaths.length; i++) {
        await cloudinary.v2.uploader.upload(filePaths[i], {
            folder: 'square_circle/', 
            public_id: `${req.body.project.title}_image${i}`
        }, (err, result)=>{
            if(err){
                console.error(`Upload err: ${err}`);
                return res.redirect('back');
            }            
            req.body.project.imgUrl.push(result.secure_url);
            req.body.project.imgId.push(result.public_id);
            if (req.body.project.imgId.length == filePaths.length){
                Project.create(req.body.project, (err, newProject)=>{
                    if(err){
                        console.log(`Project create error: ${err}`);
                        return res.redirect('back');
                    }
                    return res.redirect(`/project/${newProject._id}`);
                });
            }
        });
    }
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
        console.log(projects);
        res.redirect("/");
    };
});

//=======PROJECT SHOW ROUTE (individual)=============
router.get("/project/:id", (req, res)=>{
    Project.findById(req.params.id, (err, foundProject)=>{
        if(err || !foundProject){
            console.log(err || "could not find that project");
            return res.redirect('back');
        }
        res.render('project', {project: foundProject, cloudinary: cloudinary});
    });
});

//============EDIT PROJECT ROUTE===========
router.get("/project/:id/edit", async (req, res)=>{
    try {
        let foundProject = await Project.findById(req.params.id);
        res.render('edit', {project: foundProject});
    } catch (err){
        console.error(err);
    };
});

router.put("/project/:id", upload.array('image', 6), (req, res)=>{
    Project.findById(req.params.id, async function(err, project){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            if(req.files) {
                var filePaths = req.files.map(file => file.path);
                //DESTROY IMG IDS OF PROJECT IN CLOUDINARY and MONGODB
                try {
                    var numberOfImages = project.imgId.length;
                    for (let j=0; j < numberOfImages; j++) {
                        await cloudinary.v2.uploader.destroy(project.imgId[j]);
                    };
                } catch (err) {
                    console.log("removing IDs error");
                    console.error(err);
                } finally {
                    project.imgId = [];
                    project.imgUrl = [];
                };
                //UPLOAD NEW IMAGES SELECTED IN EDIT 
                try {
                    for (let i=0; i<filePaths.length; i++) {
                        let result = await cloudinary.v2.uploader.upload(filePaths[i], 
                            {
                                folder: "square_circle/",
                                public_id: `${req.body.project.title}_image${i}`
                            });
                        project.imgUrl.push(result.secure_url);
                        project.imgId.push(result.public_id);
                    }
                } catch (err) {
                    console.log("UPLOAD IMAGES ERROR: ")
                    console.error(err);
                    return res.redirect('back');
                };
            };
            project.title           = req.body.project.title;
            project.projectType     = req.body.project.projectType;
            project.shortDesc       = req.body.project.shortDesc;
            project.englishDesc     = req.body.project.englishDesc;
            project.lithuanianDesc  = req.body.project.lithuanianDesc;
            project.projectDate     = req.body.project.projectDate;
            project.xPosition       = req.body.project.xPosition;
            project.yPosition       = req.body.project.yPosition;

            // console.log("FINAL PROJECT: ", project);
            project.save();
            res.redirect("/project/" + req.params.id);
        };
    });
});

//=========DELETE PROJECT ROUTE============
router.delete("/project/:id", (req, res)=>{
    Project.findById(req.params.id, async (err, project)=>{
        if (err) {
            console.error(err);
            res.redirect('back');
        }
        try {
            for (let i=0; i<project.imgId.length; i++){
                await cloudinary.v2.uploader.destroy(project.imgId[i]);
            }
            project.remove();
            res.redirect("/");
        } catch (err) {
            console.error("DELETE ERROR: ", err);
            return res.redirect('back');
        };
    });
});

module.exports = router;