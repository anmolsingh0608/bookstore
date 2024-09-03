const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToTestDb = (cb) => {
  mongoose
    .connect(process.env.DB_URL_TEST, options)
    .then(() => {
      cb();
    })
    .catch((err) => {
      console.log("connection failed", err);
    });
};

const disconnect = async () => {
  await mongoose.disconnect();
};

module.exports = { connectToTestDb, disconnect };
