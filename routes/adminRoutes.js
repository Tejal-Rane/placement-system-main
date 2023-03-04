const express=require("express");
const {
  addNotice,
  addStudents,
  addPlacement,
  allstudents,
  addPlacedStudent,
  getAllPlaced,
  sendMailNotification,
}=require("../controllers/adminControllers.js");

//router object
const router = express.Router();

router.post("/add-student", addStudents);
router.post("/add-placement", addPlacement);
router.post("/add-notice", addNotice);
router.get("/get-allstudents", allstudents);
router.post("/add-placed-students", addPlacedStudent);
router.get("/get-all-placed", getAllPlaced);
router.post("/send-email-notification", sendMailNotification);
module.exports=router
