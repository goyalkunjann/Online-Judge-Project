const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { DBConnection } = require("./database/db");
const { config } = require("dotenv");
require("dotenv").config();
const PORT = process.env.PORT || config.env.PORT;
const User = require("./model/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// Middleware to allow nodejs to read data from the frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Establish database connection
DBConnection();

// Route for the homepage
app.get("/", (req, res) => {
    res.send("Welcome");
});

// Register API endpoint
app.post("/register", async(req, res) => {
    try {
        // Extract data from the request body
        const { firstname, lastname, username, email, password } = req.body;

        // Validate that all required data is provided
        if (!firstname || !lastname || !username || !email || !password) {
            return res.status(400).send("Please enter all the required details");
        }

        // Check if the user already exists
        const doesUserExist = await User.findOne({ username });
        if (doesUserExist) {
            return res.status(200).send(`User ${username} already exists`);
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Save user data to the database
        const userData = await User.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword
        });

        // Generate JWT token for the user
        const token = jwt.sign({ id: userData._id, username },
            process.env.SECRET_KEY, { expiresIn: "1h" }
        );

        // Remove password field from the response data
        userData.password = undefined;

        // Send success response with token and user data
        res.status(200).json({ message: "You have successfully registered!", userData });
    } catch (error) {
        console.log("Error:" + error.message);
    }
});

// Login API endpoint
app.post("/login", async(req, res) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body;

        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).send("Please enter all the required details");
        }

        // Find user in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(200).send(`User ${username} does not exist. Please register.`);
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Incorrect Password.");
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, username }, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });

        // Remove password field from the response data
        user.password = undefined;

        // Configure cookie options
        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true // Only accessible by server
        };

        // Set cookie with JWT token
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged In!",
            success: true,
            token // optional
        });
    } catch (error) {
        console.log("Error:" + error.message);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});