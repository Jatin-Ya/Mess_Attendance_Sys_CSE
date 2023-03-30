const express = require("express");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const app = express();

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const requestLogger = require("./utils/requestLogger");

const menuRouter = require("./routes/menuRoutes");
const inputRouter = require("./routes/inputRoutes");
const encryptionRouter = require("./routes/encryptRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const mealRouter = require("./routes/mealRoutes");

app.use(express.json({ limit: "10kb" }));
app.use(requestLogger);

app.use(cookieParser());
app.use(mongoSanitize());
app.enable("trust proxy");


app.get("/api/health", (req, res, next) => {
  res.send("Health Check is working fine!");
});

app.use("/api/menu", menuRouter);

app.use("/api/user", userRouter);

app.use("/api/input", inputRouter);
app.use("/api/encryption", encryptionRouter);

app.use("/api/review", reviewRouter);
app.use("/api/meal", mealRouter);

app.use(globalErrorHandler);

module.exports = app;
