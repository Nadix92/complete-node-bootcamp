const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");

// Sett your DB_STRING and DB_PW in your .env file
const DB = process.env.DB_STRING.replace("<PASSWORD>", process.env.DB_PW);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connection successful!"));

// Listen on server
const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
