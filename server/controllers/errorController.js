const config = require("../utils/config");

const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}.`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token! Please login again.", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has been expired! Please login again.", 401);

const sendErrorDev = (err, req, res) => {
  //API
  console.log(err.message);

  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
  }
  //RENDERED WEBSITE
  console.error("ERROR 💥", err);

  return res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  //API
  if (req.originalUrl.startsWith("/api")) {
    //Operational, trusted error: send message to the client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });

      //Programming or other unknown error: don't leak error details
    }
    //1)Log error
    console.error("ERROR 💥", err);

    //2)Send generic message
    return res.status(400).json({
      status: "error",
      message: "Something went very wrong",
    });
  }

  //RENDERED WEBSITE

  //Operational, trusted error: send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).render("error", {
      title: "Something went wrong",
      msg: err.message,
    });

    //Programming or other unknown error: don't leak error details
  }
  //1)Log error
  console.error("ERROR 💥", err);
  //2)Send generic message
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    msg: "Please try again later.",
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (config.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (config.NODE_ENV === "production") {
    //let error = { ...err };
    let error = Object.assign(err);

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(error, req, res);
  }
};
