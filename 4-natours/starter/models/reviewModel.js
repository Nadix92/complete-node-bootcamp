const mongoose = require("mongoose");
const Tour = require("./tourModel");

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

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// show users.name and .photo on every query that starts with "find"
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

// ##### Calc avg Start ##### //

reviewSchema.statics.calcAvgRatings = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" }
      }
    }
  ]);
  // console.log(stats);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

reviewSchema.post("save", function() {
  // this points to current review
  this.constructor.calcAvgRatings(this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
  // Using "this" to pass "r" from pre to post middleware
  this.r = await this.findOne();
  // console.log(this.r);

  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  // can't query this.findOne() in a post functions, query has already executed
  await this.r.constructor.calcAvgRatings(this.r.tour);
});

// ##### Calc avg End ##### //

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
