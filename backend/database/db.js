const mongoose = require("mongoose");
require("dotenv").config(); // This ensures environment variables are loaded

const DBConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error.message);
    }
};

module.exports = { DBConnection };