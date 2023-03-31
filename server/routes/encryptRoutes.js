const express = require("express");
const encryptionController = require("../controllers/encryptionController");

const Router = express.Router();

Router.post("/encrypt", encryptionController.encryptData);
// Router.get("/decrypt", encryptionController.decryptData);

module.exports = Router;
