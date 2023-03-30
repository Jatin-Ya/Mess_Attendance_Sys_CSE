const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const User = require("./../models/userModel");
const Meal = require("./../models/mealModel");
const Review = require("./../models/reviewModel");

exports.createReview = catchAsync(async (req, res, next) => {
  const { meal, review } = req.body;
//   const userId = "6425de2989d7180f6c218c55";
  const userId = req.user._id;

  const fetchedMeal = await Meal.findOne({ date: meal.date, type: meal.type });

  const existingReview = await Review.findOne({meal: fetchedMeal._id, user:userId });
  if(existingReview) {
    return next(
        new AppError(
          "You have already reviewed this meal",
          400
        )
      );
  }

  const newReview = await Review.create({
    user: userId,
    meal: fetchedMeal._id,
    review: review,
  });

  res.status(201).json({
    status: "success",
    newReview,
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: "success",
    reviews,
  });
});

exports.getAReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);
  res.status(200).json({
    status: "success",
    review,
  });
});

exports.getReviewsOfAMeal = catchAsync(async (req, res, next) => {
  const meal = req.body.meal;   
  const mealId = await Meal.findOne({ date: meal.date, type: meal.type });

  const reviews = await Review.find({ meal: mealId });

  res.status(200).json({
    status: "success",
    reviews,
  });
});

exports.updateAReview = catchAsync(async (req, res, next) => {
  const id = req.params.reviewId;
  const review = req.body.review;
  const user = req.user._id;
//   const user = "6425de2989d7180f6c218c55";


  const updatedReview = await Review.findOneAndUpdate(
    { _id: id, user: user },
    { review: review },
    { new: true }
  );

  if (!updatedReview) {
    return next(
      new AppError(
        "You either don't have permission or the review is missing",
        403
      )
    );
  }
  res.status(200).json({
    message: "updated successfully",
    updatedReview,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const id = req.params.reviewId;
  const user = req.user._id;
//   const user = "6425de2989d7180f6c218c55";

  const deleted = await Review.deleteOne({ _id: id, user: user });

  if (deleted.deletedCount === 0) {
    return next(
      new AppError(
        "You either don't have permission or the review is missing",
        403
      )
    );
  }

  res.status(204).json({
    message: "deleted successfully",
  });
});
