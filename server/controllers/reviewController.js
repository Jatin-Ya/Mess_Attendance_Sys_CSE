const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const User = require("./../models/userModel");
const Meal = require("./../models/mealModel");
const Review = require("./../models/reviewModel");

exports.createReview = catchAsync(async (req, res, next) => {
  const { mealType, date, review } = req.body;
  // const userId = "6425de2989d7180f6c218c55";
  const userId = req.user._id;
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  console.log(newDate);
  const fetchedMeal = await Meal.findOne({ date: newDate, type: mealType });

  if (!fetchedMeal) {
    return next(new AppError("Meal not found", 400));
  }

  let existingReview = await Review.findOne({
    meal: fetchedMeal._id,
    user: userId,
  });
  if (existingReview) {
    return next(new AppError("You have already reviewed this meal", 400));
  }

  const newReview = await Review.create({
    user: userId,
    meal: fetchedMeal._id,
    review: review,
  });

  existingReview = await Review.findById(newReview._id)
    .populate("user")
    .populate("meal");

  res.status(201).json({
    status: "success",
    // user: req.user,
    review: existingReview,
    // meal: fetchedMeal,
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find().populate("user").populate("meal");

  res.status(200).json({
    status: "success",
    reviews,
  });
});

exports.getAReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId)
    .populate("user")
    .populate("meal");
  res.status(200).json({
    status: "success",
    review,
  });
});

exports.getSortedReview = catchAsync(async (req, res, next) => {
  const { mealType, date } = req.params;
  let newDate = new Date(date);
  console.log("MealType and date", mealType, newDate);
  const reviews = await Review.find().populate("user").populate("meal");
  const reviewsDetail = reviews.filter(
    (review) =>
      review.meal.type === mealType &&
      review.createdAt.getMonth() === newDate.getMonth() &&
      review.createdAt.getFullYear() === newDate.getFullYear() &&
      review.createdAt.getDay() === newDate.getDay()
  );
  console.log("Review", reviewsDetail);
  res.status(200).json({
    status: "success",
    reviews: reviewsDetail,
  });
});

exports.getReviewsOfAMeal = catchAsync(async (req, res, next) => {
  const meal = req.body.meal;
  const mealId = await Meal.findOne({ date: meal.date, type: meal.type });

  const reviews = await Review.find({ meal: mealId })
    .populate("user")
    .populate("meal");

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
