const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const Meal = require("./../models/mealModel");

exports.createMeal = catchAsync(async(req,res, next) => {
    const {type} = req.body;

    const date = Date();
    const meal = await Meal.findOne({date, type});

    if(meal) {
        res.status(400).json({
            message: `A meal for ${type} already exists on ${date}`
        })
        return;
    }

    const newMeal = await Meal.create({date, type});
    res.status(201).json({
        status : "success",
        newMeal
    })
})