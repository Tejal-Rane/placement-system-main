const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    jdfile: {
      type: String,
      required: true,
    },
    branchcriteria: {
      type: Array,
      default: [],
    },
    AggrrpercentCriteria: {
      type: Number,
      default: NaN,
    },
    editorData: {
      type: String,
      required: true,
    },
    driveDate: {
      type: Date,
      required: true,
    },
    postedBy: {
      type: String,
      default: "Vaze cell",
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model("placement", placementSchema);
