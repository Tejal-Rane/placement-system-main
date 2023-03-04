const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/authController.js");

const { isAdmin, requireSignIn } =require("../middlewares/authMiddleware.js");

//router object
const router = express.Router();

//routing

//LOGIN || POST
router.post("/login", loginController);
router.post("/register", registerController);

//protected route auth
router.get("/check-auth", requireSignIn, (req, res) => {
  res.status(200).send({ success: true });
});

//protected route admin auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ success: true });
});

module.exports=router
