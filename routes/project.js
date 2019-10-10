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





module.exports = router;