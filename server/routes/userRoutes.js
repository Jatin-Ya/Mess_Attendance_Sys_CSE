const express = require("express");
const userController = require("../controllers/userController");

const Router = express.Router();

Router.post("/addMessBalance", userController.addMessBalance);
Router.get("/getAttendance", userController.generateMessAttendanceExcel);
Router.post("/demo", userController.addMealToUser);

module.exports = Router;
