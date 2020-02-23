const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty!"]
    },
    rating: {
      type: Number,
      min: [1, "Minimum rating is 1"],
      max: [5, "Maximum Rating is 5"]
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to a tour."]
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"]
    }
  },
  {
    // So we can view ref documents on output
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.pre(/^find/, function(next) {
  // path = name in schema, select = witch fields we wanna select in our schema
  // this.populate({
  //   path: "tour",
  //   select: "name"
  // }).populate({
  //   path: "user",
  //   select: "name photo"
  // });

  this.populate({
    path: "user",
    select: "name photo"
  });

  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
