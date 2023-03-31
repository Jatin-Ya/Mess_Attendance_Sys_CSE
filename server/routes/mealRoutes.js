const express = require("express");
const router = express.Router();

const { createMeal, getMealStatsOfDay } = require("./../controllers/mealController");

router.post("/", createMeal);
router.get("/today-stats", getMealStatsOfDay);
module.exports = router;
