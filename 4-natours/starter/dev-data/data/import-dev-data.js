const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Tour = require("./../../models/tourModel");

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

// Import data in to database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
};

// delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted from collection");
  } catch (err) {
    console.log(err);
  }
};

// deleteData();
// importData();
