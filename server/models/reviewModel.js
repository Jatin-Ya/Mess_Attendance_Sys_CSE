const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user : {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    meal: {
        type: mongoose.Schema.ObjectId,
        ref: "Meal",
        required: true
    },

    review: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

reviewSchema.index({ user: 1, meal: 1 }, { unique: true });

const reviewModel = mongoose.model("Review", reviewSchema);
module.exports = reviewModel;