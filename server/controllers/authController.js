const { OAuth2Client } = require("google-auth-library");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const User = require("../models/userModel");
const config = require("../utils/config");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const createToken = (id, role) => {
  const jwtToken = jwt.sign({ id, role }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
  return jwtToken;
};

exports.login = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return next(new AppError("No token found", 400));
  }

  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  console.log(response?.data);
  const { name, email, picture } = response?.data;

  let currUser = await User.findOne({ email });

  if (!currUser) {
    return next(new AppError("User not found", 401));
  }

  if (currUser.picture !== picture) {
    currUser.picture = picture;
    await currUser.save();
  }

  const userInfo = {
    name,
    email,
    picture,
    roomNumber: currUser.roomNumber,
    rollNumber: currUser.rollNumber,
    hostel: currUser.hostel,
    _id: currUser._id,
  };

  const jwtToken = createToken(currUser._id, "student");

  res.status(200).json({
    user: userInfo,
    jwt: jwtToken,
    message: "Logged Successfully",
  });
});

exports.verifyJwtToken = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  // 2) Verifying token
  const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);

  req.jwtPayload = {
    id: decoded.id,
    role: decoded.role,
  };
  next();
});

exports.loggedInUser = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.jwtPayload.id);
  if (!currentUser) {
    return next(new AppError("User not found", 401));
  }
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
