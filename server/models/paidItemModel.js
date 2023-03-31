const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paidItemSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },

  item: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    default: 1,
    required: true,
  },

  price:{
    type: Number,
    required: true,
  },

  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const paidItemModel = mongoose.model("PaidItem", paidItemSchema);
module.exports = paidItemModel;
