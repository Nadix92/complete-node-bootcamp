const app = require("./app");

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

// later we add database here
// error handling
// other config
