const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const encryptionController = require("./encryptionController");

const ExcelJS = require("exceljs");
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Mess Attendance");

const User = require("./../models/userModel");
const Meal = require("./../models/mealModel");
const paidItemModel = require("../models/paidItemModel");
const path = require("path");

const path = require('path');

const fs = require("fs");

const admin = ["20cs01029@iitbbs.ac.in", "21cs02007@iitbbs.ac.in"];
const mealPriceMap = {
  breakfast: 30,
  lunch: 60,
  snacks: 20,
  dinner: 60,
};

const TIME_LIMIT = 4;

const getColumns = (year, month, endDate) => {
  let columns = [
    { header: "S.no", key: "serial" },
    { header: "Name", key: "name" },
    { header: "Roll Number", key: "rollno" },
    { header: "Email", key: "email" },
    { header: "Hostel", key: "hostel" },
  ];

  for (let i = 1; i <= endDate.getDate(); i++) {
    columns.push({
      header: `${i} - breakfast`,
      key: `${i}_breakfast`,
    });
    columns.push({
      header: `${i} - lunch`,
      key: `${i}_lunch`,
    });
    columns.push({
      header: `${i} - snacks`,
      key: `${i}_snacks`,
    });
    columns.push({
      header: `${i} - dinner`,
      key: `${i}_dinner`,
    });
  }

  columns.push({
    header: "charges",
    key: "messCharges",
  });

  return columns;
};

const getDefaultRow = (user, serial, attendance, endDate) => {
  let name = user.name;
  let email = user.email;
  let sno = serial;
  let rollno = user.rollNumber;
  let messBalance = user.messBalance;
  let hostel = user.hostel;
  let row = { name, email, serial: sno, rollno, hostel, messCharges: 0 };
  const meal = {};
  // for (let i = 0; i < attendance.length; i++) {
  //   meal[`${i + 1}_breakfast`] = Number(attendance[i].breakfast);
  //   meal[`${i + 1}_lunch`] = Number(attendance[i].lunch);
  //   meal[`${i + 1}_snacks`] = Number(attendance[i].snacks);
  //   meal[`${i + 1}_dinner`] = Number(attendance[i].dinner);
  // }

  let lastDay = endDate.getDate();

  for (let i = 0; i < lastDay; i++) {
    row[`${i + 1}_breakfast`] = 0;
    row[`${i + 1}_lunch`] = 0;
    row[`${i + 1}_snacks`] = 0;
    row[`${i + 1}_dinner`] = 0;
  }

  let messCharges = 0;
  for (let i = 0; i < attendance.length; i++) {
    const date = attendance[i].date.getDate();
    row[`${date}_breakfast`] = attendance[i].breakfast ? 1 : 0;
    row[`${date}_lunch`] = attendance[i].lunch ? 1 : 0;
    row[`${date}_snacks`] = attendance[i].snacks ? 1 : 0;
    row[`${date}_dinner`] = attendance[i].dinner ? 1 : 0;

    if (attendance[i].breakfast) messCharges += mealPriceMap.breakfast;
    if (attendance[i].lunch) messCharges += mealPriceMap.lunch;
    if (attendance[i].snacks) messCharges += mealPriceMap.snacks;
    if (attendance[i].dinner) messCharges += mealPriceMap.dinner;
  }

  row.messCharges = messCharges;
  return { ...row };
};

exports.getUserRole = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  if (!email) {
    return next(new AppError("Invalid data", 404));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Student not found", 404));
  }
  req.user = user;
  req.user.save();
  let role = "user";
  if (admin.includes(email)) {
    role = "admin";
  }
  res.status(200).json({ status: "success", role });
});

exports.generateMessAttendanceExcel = catchAsync(async (req, res, next) => {
  //get month and year
  //month is 0,1,...11
  // const {month, year} = req.body;
  // console.log("user", req.user);
  const month = 3;
  const year = 2023;

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month, 0);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const users = await User.find().populate("mealsAvailed");
  //Dummy data

  // const users = [
  //   {
  //     email: "user1@example.com",
  //     name: "User 1",
  //     hostel: "MHR",
  //     rollNumber: "111",
  //     messBalance: 500,
  //     roomNumber: "A101",
  //     img: "https://example.com/user1.jpg",
  //     mealsAvailed: [],
  //   },
  //   {
  //     email: "user2@example.com",
  //     name: "User 2",
  //     hostel: "BHR",
  //     rollNumber: "222",
  //     messBalance: 500,
  //     roomNumber: "B202",
  //     img: "https://example.com/user2.jpg",
  //     mealsAvailed: [],
  //   },
  // ];

  // // Add meals to each user's mealsAvailed array
  // for (const user of users) {
  //   for (let i = 1; i <= 31; i++) {
  //     const breakfast = new Meal({
  //       date: new Date(`2023-03-${i}`),
  //       type: "breakfast",
  //       quantity: 1,
  //     });
  //     const lunch = new Meal({
  //       date: new Date(`2023-03-${i}`),
  //       type: "lunch",
  //       quantity: 1,
  //     });
  //     const snacks = new Meal({
  //       date: new Date(`2023-03-${i}`),
  //       type: "snacks",
  //       quantity: 1,
  //     });
  //     const dinner = new Meal({
  //       date: new Date(`2023-03-${i}`),
  //       type: "dinner",
  //       quantity: 1,
  //     });
  //     user.mealsAvailed.push(breakfast, lunch, snacks, dinner);
  //   }
  // }

  // console.log(users);
  // console.log(endDate.getDate())

  const columns = getColumns(year, month, endDate);
  // console.log(columns);

  worksheet.columns = columns;

  let i = 1;
  users.forEach((user) => {
    const mealsAvailed = user.mealsAvailed;
    let attendance = formatAttendance(mealsAvailed);
    let row = getDefaultRow(user, i, attendance, endDate);
    worksheet.addRow(row);
    i++;
  });

  workbook.xlsx
    .writeFile("excel/mess-attendance.xlsx")
    .then(() => {
      console.log("Excel file generated successfully!");
    })
    .catch((err) => {
      return next(new AppError("Error in generating excel", 401));
    });

  const filePath = path.join(__dirname, "..", "excel", "mess-attendance.xlsx")
  const fileName = "attendance.xlsx";
  // console.log(file);

  // res.download(file, function(err) {
  //   console.log(err);
  // })
  res.status(201).json({
    status: "success",
  })

  // res.download(filePath, (err) => {
  //   if(err) {
  //     console.log(err)
  //   } else {
  //     console.log("Downloaded successfully")
  //   }
  // })
  // const file = fs.createReadStream(filePath);
  // file.on('error', (err) => {
  //   console.error(err);
  //   res.status(500).send('Server Error');
  // });
  
  // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  // res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
  
  // file.pipe(res);
  
  // res.on('abort', () => {
  //   console.log('Request aborted by client');
  // });

  
  // res.status(200)

  //S.no, Name, Roll No, 1, 2,3,4,.....30, Total days, total cost
});

exports.downloadExcel = catchAsync(async (req, res, next) => {
  const filePath = path.join(__dirname, "..", "excel", "mess-attendance.xlsx");
  const fileName = "mess-attendance.xlsx";
  res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.sendFile(filePath);
});

exports.addMealToUser = catchAsync(async (req, res, next) => {
  const { encryptedString, scanningHostel, mealId } = req.body;

  if (!encryptedString || !scanningHostel || !mealId) {
    return next(new AppError("Invalid Request, required Data missing", 400));
  }

  const decryptedData = encryptionController.decryptData(encryptedString);

  const { userId, hostel, time } = decryptedData;

  if (!userId || !hostel || !time) {
    return next(new AppError("Invalid Data in QR Code", 403));
  }

  if (hostel !== scanningHostel) {
    return next(new AppError("Student does not belong to the hostel", 403));
  }

  const currentTime = Date.now();
  const diffInHours = (currentTime - time) / (1000 * 60 * 60);

  if (diffInHours > TIME_LIMIT) {
    return next(
      new AppError(
        `This QR Code is older than ${TIME_LIMIT} hrs\n Please generate a new QR Code and try again`,
        400
      )
    );
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

exports.addPaidMealToUser = catchAsync(async (req, res, next) => {
  const { encryptedString, scanningHostel, items } = req.body;

  if (!encryptedString || !scanningHostel || !items.length <= 0) {
    return next(new AppError("Invalid Request", 400));
  }

  const decryptedData = encryptionController.decryptData(encryptedString);

  // //TODO: Include time
  const { userId, hostel } = decryptedData;

  if (!userId || !hostel) {
    return next(new AppError("Invalid Data", 403));
  }
  // const { ObjectId } = require("mongodb");
  // let userId = new ObjectId("6425de2989d7180f6c218c4d");

  if (!userId || !hostel) {
    return next(new AppError("Invalid Data", 403));
  }

  const user = await User.findById(userId);
  // console.log("user", user);

  if (!user) {
    return next(new AppError("Student not found", 404));
  }

  const date = new Date();

  let totalPrice = 0;
  for (const item of items) {
    totalPrice += item.price * item.quantity;
  }

  await paidItemModel.create({
    userId: userId,
    items,
    date,
    totalPrice,
  });
  // console.log("newItem total Price", totalPrice);
  user.messBalance += totalPrice;
  await user.save();

  res.status(201).json({
    message: "Student billed for this paid meal successfully",
  });
});

const formatAttendance = (mealsAvailed) => {
  let i = 0;
  let n = mealsAvailed.length;

  let attendance = [];
  while (i < n) {
    let currDateMeals = {
      date: "",
      breakfast: false,
      lunch: false,
      snacks: false,
      dinner: false,
    };
    let currDate = mealsAvailed[i].date;
    currDateMeals["date"] = currDate;
    while (i < n) {
      if (mealsAvailed[i].date.toString() === currDate.toString()) {
        let type = mealsAvailed[i].type;
        currDateMeals[type] = true;
        i++;
      } else {
        break;
      }
    }

    attendance.push(currDateMeals);
  }
  return attendance;
};
exports.getAttendanceSelf = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  // const id = "6425de2989d7180f6c218c69";
  // const {startDate, endDate} = req.query;

  const user = await User.findById(id).populate("mealsAvailed").sort("date");

  if (!user) {
    return next(new AppError("User not found", 401));
  }

  let mealsAvailed = user.mealsAvailed;

  const attendance = formatAttendance(mealsAvailed);

  // console.log(attendance)
  res.status(200).json({
    status: "success",
    attendance,
  });
});

//TODO: Backend Request for user calender
// TODO: Handle Authentication middleware
