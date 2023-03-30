const { google, Auth } = require("googleapis");

const User = require("../models/userModel");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const config = require("../utils/config");

const hostelsList = ["BHR", "MHR"];
const googleAuthConfig = {
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
};
const spreadsheetId = config.SPREADSHEET_ID;

const getResidentsFromHostel = catchAsync(async (req, res, next) => {
  if (!req.query.hostel) {
    return next(new AppError("Hostel not found", 400));
  }

  const hostel = req.query.hostel;

  if (!hostelsList.includes(hostel)) {
    return next(new AppError("Hostel not in the list", 400));
  }

  const auth = new Auth.GoogleAuth(googleAuthConfig);
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const response = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: `${hostel}!A:D`,
  });

  // ORDER : NAME, ROLL, EMAIL, ROOM
  const values = response?.data?.values;
  values.shift();

  const residents = values.map((student) => {
    if (!student[0] || !student[1] || !student[2] || !student[3]) {
      console.log(student);
    } else {
      return {
        name: student[0],
        rollNumber: student[1],
        email: student[2],
        roomNumber: student[3],
        hostel: hostel,
      };
    }
  });

  //TODO:
  await User.insertMany(residents);

  res.status(200).json({
    message: `${residents.length} users inserted successfully into ${hostel} successfully`,
  });
});

module.exports = { getResidentsFromHostel };
