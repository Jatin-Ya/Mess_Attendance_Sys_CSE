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
    const review = await Review.findById(req.params.reviewId);
    res.status(200).json({
        status : "success",
        review
    })
})

exports.getReviewsOfAMeal = catchAsync(async(req,res,next) => {
    const reviews = await Review.find({meal : req.params.mealId});

    res.status(200).json({
        status : "success",
        reviews
    })
})

exports.updateAReview = catchAsync(async(req,res,next) => {
    const id = req.params.reviewId;
    const review = req.body.review;
    const user = req.user._id;

    const updatedReview = await Review.findOneAndUpdate({_id : id, user : user}, {review: review}, {new: true});

    if(!updatedReview) {
        res.status(403).json({
            message: "You either don't have permission to update or the review is missing"
        })

        return next();
    }
    res.status(200).json({
        message: "updated successfully",
        updatedReview
    })
})

exports.deleteReview = catchAsync(async(req,res,next) => {
    const id = req.paramas.reviewId;
    const user = req.user._id;

    const deleted = await Review.deleteOne({_id : id, user : user});

    if(deleted.deletedCount === 0) {
        res.status(403).json({
            message : "You either don't have permission or the review is missing"
        })

        return next();
    }

    res.status(204).json({
        message: "deleted successfully"
    })
})
