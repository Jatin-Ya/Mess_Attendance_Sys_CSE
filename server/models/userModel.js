const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    hostel: {
      type: String,
      enum: ["MHR", "BHR", "GHR", "RHR", "SHR"],
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
    },
    messBalance: {
      type: Number,
      required: true,
      default: 0,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    img: String,
    mealsAvailed: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Meal",
      },
    ],
    // reviews: [{
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Review"
    // }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
