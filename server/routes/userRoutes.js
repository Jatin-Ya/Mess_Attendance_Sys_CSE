const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const Router = express.Router();

Router.post("/addPaidMessBalance", userController.addPaidMealToUser);
Router.get(
  "/attendance-self",
  //   authController.verifyJwtToken,
  //   authController.loggedInUser,
  userController.getAttendanceSelf
);
Router.get("/getAttendance", userController.generateMessAttendanceExcel);
Router.get("/getAttendanceDownloaded", userController.downloadExcel);
Router.post("/demo", userController.addMealToUser);
Router.post("/getRole", userController.getUserRole);

module.exports = Router;
