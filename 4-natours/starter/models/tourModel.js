const mongoose = require("mongoose");

// Only the variables we specify where can be stored in our DB else it will be ignored on save
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"], // second argument is the error
    unique: true // Can only have one
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"]
  }
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
