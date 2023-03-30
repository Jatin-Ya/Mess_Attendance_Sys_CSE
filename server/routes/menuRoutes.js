const express = require("express");
const menuController = require("../controllers/menuController");

const Router = express.Router();

Router.post("/createMenu", menuController.createUpdateMenu);
Router.get("/getMenu", menuController.getMenuDetails);

module.exports = Router;
