const express = require("express");
const {
  createProfileCtrl,
  getAllDrives,
  getallplacedcompanies,
  getProfile,
  getDrive,
  
} = require("../controllers/userController.js");

//router object
const router = express.Router();

router.post("/create-profile", createProfileCtrl);
router.get("/get-all-drives", getAllDrives);
router.get("/get-profile-details/:id", getProfile);
router.get("/placement/get-placement/:id", getDrive);
router.get("/get-all-companies/:id", getallplacedcompanies);
module.exports=router
