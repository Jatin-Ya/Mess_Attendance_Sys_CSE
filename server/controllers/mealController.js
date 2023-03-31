const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const Meal = require("./../models/mealModel");

exports.createMeal = catchAsync(async (req, res, next) => {
  const { type, hostel } = req.body;

  const tempDate = new Date();
  const date = tempDate.setHours(0, 0, 0, 0);

  const meal = await Meal.findOne({ date, type, hostel });

  if (meal) {
    return next(
      new AppError(
        `A meal for ${type} already exists on ${new Date(date)} in ${hostel}`,
        400
      )
    );
  }

  const newMeal = await Meal.create({ date, type, hostel });
  res.status(201).json({
    status: "success",
    newMeal,
  });
});
