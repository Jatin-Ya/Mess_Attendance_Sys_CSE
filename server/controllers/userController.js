const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const encryptionController = require("./encryptionController");

const ExcelJS = require("exceljs");
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Mess Attendance");

const User = require("./../models/userModel");
const Meal = require("./../models/mealModel");

const mealPriceMap = {
  breakfast: 30,
  lunch: 60,
  snacks: 20,
  dinner: 60,
};

exports.addMessBalance = catchAsync(async (req, res, next) => {
  const { email, price, meal } = req.body;

  const currUser = await User.findOne({ email });

  if (!currUser) {
    return next(new AppError("User not found", 401));
  }

  //Checking of user already taken a meal or not

  if (price < 0) {
    if (meal === "breakfast") price = 30;
    else if (meal === "lunch" || meal === "dinner") price = 60;
    else if (meal === "snacks") price = 20;

    // const now = new Date();
    // const hours = now.getHours();
    // const minutes = now.getMinutes();
    // const dayOfWeek = [
    //   "Sunday",
    //   "Monday",
    //   "Tuesday",
    //   "Wednesday",
    //   "Thursday",
    //   "Friday",
    //   "Saturday",
    // ][now.getDay()];

    // //Breakfast
    // if (
    //   (dayOfWeek === "Sunday" || dayOfWeek === "Saturday") &&
    //   hours >= 8 &&
    //   minutes >= 0 &&
    //   hours < 10 &&
    //   minutes <= 30
    // ) {
    //   price = 30;
    // } else if (
    //   dayOfWeek !== "Sunday" &&
    //   dayOfWeek !== "Saturday" &&
    //   hours >= 7 &&
    //   minutes >= 15 &&
    //   hours < 10
    // ) {
    //   price = 30;
    // } else if (
    //   (hours === 12 && minutes >= 30 && hours < 2) ||
    //   (hours === 20 && minutes >= 15 && hours < 22 && minutes < 30)
    // ) {
    //   //lunch and dinner
    //   price = 60;
    // } else if (hours === 17 && minutes >= 30 && hours < 18 && minutes < 30) {
    //   //snacks
    //   price = 20;
    // } else {
    //   return next(new AppError("Invalid time", 401));
    // }
  }

  currUser.messBalance += price;
  await currUser.save();

  res.status(201).json({
    status: "success",
  });
});

exports.generateMessAttendanceExcel = catchAsync(async (req, res, next) => {
  worksheet.columns = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Hostel", key: "hostel" },
    { header: "balance", key: "balance" },
  ];

  // Add rows
  const dummyData = [
    {
      name: "John",
      email: "abc@iitbbs.ac.in",
      hostel: "BHR",
      balance: 100,
    },
    {
      name: "John1",
      email: "abc1@iitbbs.ac.in",
      hostel: "MHR",
      balance: 1000,
    },
    {
      name: "John2",
      email: "abc2@iitbbs.ac.in",
      hostel: "BHR",
      balance: 200,
    },
  ];
  dummyData.forEach((user) => {
    worksheet.addRow(user);
  });
  workbook.xlsx
    .writeFile("excel/mess-attendance.xlsx")
    .then(() => {
      console.log("Excel file generated successfully!");
    })
    .catch((err) => {
      return next(new AppError("Error in generating excel", 401));
    });
  res.status(201).json({
    status: "success",
  });
});

exports.addMealToUser = catchAsync(async (req, res, next) => {
  const { encryptedString, scanningHostel, mealId } = req.body;

  if (!encryptedString || !scanningHostel || !mealId) {
    return next(new AppError("Invalid Request", 400));
  }

  const decryptedData = encryptionController.decryptData(encryptedString);

  //TODO: Include time
  const { userId, hostel } = decryptedData;

  if (!userId || !hostel) {
    return next(new AppError("Invalid Data", 403));
  }

  if (hostel !== scanningHostel) {
    return next(new AppError("Student does not belong to the hostel", 403));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("Student not found", 404));
  }

  if (user.mealsAvailed.includes(mealId)) {
    return next(new AppError("Student has already availed this meal", 400));
  }

  const meal = await Meal.findById(mealId);

  if (!meal) {
    return next(new AppError("Meal does not exist", 404));
  }

  if (!meal.type) {
    return next(new AppError("Meal price does not exist", 404));
  }

  const price = mealPriceMap[meal.type];

  user.messBalance += price;
  user.mealsAvailed.push(mealId);
  await user.save();

  res.status(201).json({
    message: "Student billed for this meal successfully",
  });
});

//TODO: Backend Request for user calender
// TODO: Handle Authentication middleware
