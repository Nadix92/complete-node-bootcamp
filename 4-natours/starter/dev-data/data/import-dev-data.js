const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Tour = require("./../../models/tourModel");
const User = require("./../../models/userModel");
const Review = require("./../../models/reviewModel");

dotenv.config({ path: "./.env" });

// Connect to the DB
const DB = process.env.DB_STRING.replace("<PASSWORD>", process.env.DB_PW);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connection successful!"));

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8")); // Put path to ur Json Data File here
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8")); // Put path to ur Json Data File here
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")); // Put path to ur Json Data File here

// Import data in to database
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
};

// delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("Data successfully deleted from collections");
  } catch (err) {
    console.log(err);
  }
};

// deleteData();
// importData();
