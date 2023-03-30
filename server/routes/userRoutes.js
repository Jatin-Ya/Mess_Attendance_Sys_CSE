const express = require("express");
const userController = require("../controllers/userController");

const Router = express.Router();

Router.post("/addMessBalance", userController.addMessBalance);

module.exports = Router;
