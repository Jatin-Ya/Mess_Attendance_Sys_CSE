const express = require("express");
const userController = require("../controllers/userController");

const Router = express.Router();

Router.post("/addPaidMessBalance", userController.addPaidMealToUser);
Router.get("/attendance-self", userController.getAttendanceSelf);
Router.get("/getAttendance", userController.generateMessAttendanceExcel);
Router.post("/demo", userController.addMealToUser);

module.exports = Router;
