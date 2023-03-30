const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    date : {
        type: Date,
        required: true,

    },

    type : {
        type : String,
        required: true,
        enum : ["breakfast", "lunch", "snacks", "dinner"]
    }
})


const mealModel = mongoose.model("Meal", mealSchema);
module.exports = mealModel;