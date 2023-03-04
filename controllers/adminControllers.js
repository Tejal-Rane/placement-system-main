const userModel =require("../models/userModel.js");
const noticeModel =require("../models/noticeModel.js");
const { comparePassword, hashPassword } =require("./../helpers/authHelper.js");
const placementModel =require("../models/placementModel.js");
const profileModel =require("../models/profileModel.js");
const allPlacementModel =require("../models/allPlacementModel.js");
const  transporter  =require("../server.js");
const sendMailNotification = async (req, res) => {
  var mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: req.body.emailarray,
    subject: "TPO cell Vaze",
    template: "email",
    context: {
      company: req.body.formData.companyName,
      package: req.body.formData.package,
    },
  };

 transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      // console.log(info.response);
      res.status(200).json({ message: "emails send success" });
    }
  });
};

const addStudents = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validations

    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered ",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

const addNotice = async (req, res) => {
  try {
    const notice = new noticeModel(req.body);
    await notice.save();
    res.status(200).json({ success: true, message: "notice added success" });
  } catch (error) {
    res.status(501).json({
      message: "Failed to add notice",
      success: false,
    });
  }
};

const addPlacement = async (req, res) => {
  try {
    const notice = new placementModel(req.body);
    await notice.save();
    res.status(200).json({ success: true, message: "placement added success" });
  } catch (error) {
    res.status(501).json({
      message: "Failed to add placement",
      success: false,
      error: error,
    });
  }
};

const allstudents = async (req, res) => {
  try {
    const allstudents = await profileModel.find({});
    const allCompanies = await placementModel.find({});
    res.status(200).json({ allstudents, allCompanies });
  } catch (error) {
    res.status(501).json({
      message: "Failed to fetch students",
      success: false,
      error: error,
    });
  }
};

const addPlacedStudent = async (req, res) => {
  try {
    allPlacementModel.insertMany(req.body, (err, resp) => {
      res.status(200).send({ message: "placed students added successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "student adding failed",
      success: false,
      error: error,
    });
  }
};

const getAllPlaced = async (req, res) => {
  try {
    const allplaced = await allPlacementModel.find({});
    const aggrcount = await allPlacementModel.aggregate([
      { $group: { _id: "$company", count: { $sum: 1 } } },
    ]);

    const branchCount = await allPlacementModel.aggregate([
      { $group: { _id: "$branch", count: { $sum: 1 } } },
    ]);

    res.status(200).json({ allplaced, aggrcount, branchCount });
  } catch (error) {
    res.status(501).json({
      message: "fetch  failed",
      success: false,
      error: error,
    });
  }
};
module.exports={sendMailNotification, addStudents,getAllPlaced,addPlacedStudent,allstudents,addPlacement,addNotice}