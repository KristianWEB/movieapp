const mongoose = require("mongoose");
const db = "mongodb://localhost:27017/movieapp";

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process on failure
    process.exit(1);
  }
};

module.exports = connectDB;
