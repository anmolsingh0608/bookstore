const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDb = () => {
  return mongoose.connect(process.env.DB_URL, options);
};

module.exports = connectDb;
