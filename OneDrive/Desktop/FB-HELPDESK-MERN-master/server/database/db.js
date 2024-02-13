const mongoose = require("mongoose");

const DBConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database", error.message);
    }
};

module.exports = { DBConnection };