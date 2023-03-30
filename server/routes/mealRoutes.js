const express = require("express");
const router = express.Router();

const {createMeal} = require("./../controllers/mealController");

router.post("/", createMeal);

module.exports = router;