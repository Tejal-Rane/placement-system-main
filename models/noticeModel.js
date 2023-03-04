const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    notice: {
      type: String,
      required: true,
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    postedBy: {
      type: String,
      default: "vaze cell",
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model("notices", noticeSchema);
