const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
});

const paidItemSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },

  items: [itemSchema],
  
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const paidItemModel = mongoose.model("PaidItem", paidItemSchema);
module.exports = paidItemModel;
