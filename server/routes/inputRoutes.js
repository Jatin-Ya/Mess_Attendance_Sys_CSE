const express = require("express");
const inputController = require("../controllers/inputController");

const Router = express.Router();

Router.get("/googleSheets", inputController.getResidentsFromHostel);

module.exports = Router;
