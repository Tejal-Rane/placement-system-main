const mongoose = require("mongoose");

const allPlacedStudentSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  package: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
});


module.exports=mongoose.model("placed-student", allPlacedStudentSchema);