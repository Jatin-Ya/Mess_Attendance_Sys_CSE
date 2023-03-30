const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const User = require("./../models/userModel");

exports.addMessBalance = catchAsync(async (req, res, next) => {
  const { email, price } = req.body;

  const currUser = await User.findOne({ email });

  if (!currUser) {
    return next(new AppError("User not found", 401));
  }

  //Checking of user already taken a meal or not

  if (price < 0) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const dayOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][now.getDay()];

    //Breakfast
    if (
      (dayOfWeek === "Sunday" || dayOfWeek === "Saturday") &&
      hours >= 8 &&
      minutes >= 0 &&
      hours < 10 &&
      minutes <= 30
    ) {
      price = 30;
    } else if (
      dayOfWeek !== "Sunday" &&
      dayOfWeek !== "Saturday" &&
      hours >= 7 &&
      minutes >= 15 &&
      hours < 10
    ) {
      price = 30;
    } else if (
      (hours === 12 && minutes >= 30 && hours < 2) ||
      (hours === 20 && minutes >= 15 && hours < 22 && minutes < 30)
    ) {
      //lunch and dinner
      price = 60;
    } else if (hours === 17 && minutes >= 30 && hours < 18 && minutes < 30) {
      //snacks
      price = 20;
    } else {
      return next(new AppError("Invalid time", 401));
    }
  }

  currUser.messBalance += price;
  await currUser.save();

  res.status(201).json({
    status: "success",
  });
});
