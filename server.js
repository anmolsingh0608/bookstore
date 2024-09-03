const app = require("./app");
const connectToDb = require("./config/database");
const PORT = process.env.PORT || 5100;

connectToDb()
  .then(() => {
    console.log("connected to DB")
    app.listen(PORT, () => {
      console.log("Server started on port " + PORT);
    });
  })
  .catch((err) => {
    console.log("server failed to start, DB connection failed", err);
  });
