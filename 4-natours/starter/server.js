const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

// later we add database here
// error handling
// other config
