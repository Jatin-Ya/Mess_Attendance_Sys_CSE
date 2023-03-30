const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


const User = require("./../models/userModel");
const Review = require("./../models/reviewModel");

exports.createReview = catchAsync(async (req,res,next) => {
    const {meal, review} = req.body;
    const userId = req.user._id;

    const currUser = await User.findById(userId);

    if(!currUser) {
        return next(new AppError("User not found", 401));
    }

    const newReview = await Review.create({user:  userId, meal: meal, review: review});

    res.status(201).json({
        status: "success",
        newReview
    })
})


exports.getAllReviews = catchAsync(async (req,res,next) => {
    const reviews = await Review.find();

    res.status(200).json({
        status: "success",
        reviews
    })
})


exports.getAReview = catchAsync(async (req,res,next) => {
    const review = await Review.findById(req.params.id);

    res.status(200).json({
        status : "success",
        review
    })

})