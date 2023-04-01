const config = require("../utils/config");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Menu = require("../models/menuModel");

exports.getMenuDetails = catchAsync(async (req, res, next) => {
  //Return the menu details
  const menu = await Menu.find().sort({order:1});
  if (!menu) {
    return next(new AppError("Menu not found", 401));
  }
  res.status(200).json({ menu });
});

exports.createUpdateMenu = catchAsync(async (req, res, next) => {
  //Create a new menu
  //   console.log("Creating menu", req.body);
  const { day, breakfast, lunch, snacks, dinner } = req.body;
  let dayMenu = await Menu.findOne({ day });
  let msg = "Menu created successfully";
  if (!dayMenu) {
    await Menu.create({
      day,
      breakfast,
      lunch,
      snacks,
      dinner,
    });
  } else if (dayMenu) {
    await Menu.findByIdAndUpdate(dayMenu._id, {
      day,
      breakfast,
      lunch,
      snacks,
      dinner,
    });
    msg = "Menu updated successfully";
  }
  res.status(200).json({ msg });
});
