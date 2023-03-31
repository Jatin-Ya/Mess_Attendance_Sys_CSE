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

exports.getMealStatsOfDay = catchAsync(async (req, res, next) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const meals = await Meal.find({ date });

  console.log(date);
  console.log(meals);
  let response = { date: date, breakfast: 0, lunch: 0, snacks: 0, dinner: 0 };
  for (let i = 0; i < meals.length; i++) {
    response[meals[i].type] = meals[i].quantity;
  }

  res.status(200).json(response);
});
