const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const CORS = require("cors");
const bodyParser = require("body-parser");

// routes
const authRoutes = require("./src/routes/auth");
const booksRoutes = require("./src/routes/books");
const logger = require("./src/util/logger");
const errorHandler = require("./src/middleware/errorMiddleware");

// body parser
app.use(bodyParser.json());
app.use(CORS());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

// use routes
app.use("/auth", authRoutes);
app.use("/books", booksRoutes);

app.use(errorHandler);

// handle unhandled exceptions
process.on("uncaughtException", (error) => {
  console.log("error occurred", error);
  logger.error(error.stack);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  logger.error(error.stack);
});

// gracefully shutdown server
process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
    // boolean means [force], see in mongoose doc
    mongoose.connection.close(false, () => {
      console.log("MongoDb connection closed.");
      process.exit(0);
    });
  });
});

module.exports = app;
