const express = require("express");
const router = express.Router();

const {
  getAReview,
  getAllReviews,
  getReviewsOfAMeal,
  createReview,
  updateAReview,
  deleteReview,
} = require("./../controllers/reviewController");

router.get("/", getAllReviews);
router.get("/meal", getReviewsOfAMeal);

router.get("/:reviewId", getAReview);
router.post("/", createReview);
router.patch("/:reviewId", updateAReview);
router.delete("/:reviewId", deleteReview);

module.exports = router;
