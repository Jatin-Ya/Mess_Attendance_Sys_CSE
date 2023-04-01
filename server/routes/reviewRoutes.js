const express = require("express");
const router = express.Router();

const {
  getAReview,
  getAllReviews,
  getReviewsOfAMeal,
  createReview,
  updateAReview,
  deleteReview,
  getSortedReview,
  getToxicityScore
} = require("./../controllers/reviewController");
const authController = require("./../controllers/authController");

// optional route
router.get("/toxicity-score", getToxicityScore);

router.get("/", getAllReviews);
router.get("/meal", getReviewsOfAMeal);

router.get("/:reviewId", getAReview);
router.get("/:mealType/:date", getSortedReview);
router.post(
  "/",
  authController.verifyJwtToken,
  authController.loggedInUser,
  createReview
);
router.patch("/:reviewId", updateAReview);
router.delete("/:reviewId", deleteReview);


module.exports = router;
