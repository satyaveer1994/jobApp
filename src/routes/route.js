
const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const jobController = require("../controllers/jobController");
const applicantController= require("../controllers/applicationController")
const auth = require("../middleware/auth");



// user routes
router.post("/userRegister",userController.createUser);
router.post("/login",userController.loginUser)


//job


router.post("/jobPost",auth.authentication,auth.authorisation,jobController.createJob);
router.get("/jobByFilter",auth.authentication,jobController.searchJobs)
router.get("/jobapplicantsList",auth.authentication,auth.authorisation,jobController.applicantsList)



router.post("/applyJob",auth.authentication,applicantController.createApplication)


module.exports = router;