const dotenv = require('dotenv').config(); // works only if ur name your file .env else u need to specify path
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

// Sett your DB_STRING and DB_PW in your .env file
const DB = process.env.DB_STRING.replace('<PASSWORD>', process.env.DB_PW);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

// Listen on server
const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log(`Server running on port: ${port}`));

// check for all unhandled Promise
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION!! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
