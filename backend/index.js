const express = require("express");
const app = express();
const { DBConnection } = require("./database/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./model/userschema");

// Load environment variables
require("dotenv").config();

// Middleware to parse JSON bodies of incoming requests
app.use(express.json());

// Establish database connection
DBConnection();

// Define PORT
const PORT = process.env.PORT || 8080;

// Welcome route
app.get("/", (req, res) => {
    res.send("Welcome to the backend server");
});

// Signup API
app.post("/signup", async(req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;

        // Validate all required fields are present
        if (!firstname || !lastname || !username || !email || !password) {
            return res.status(400).json({ message: "Please provide all required details" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword
        });

        // Save user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login API
app.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;

        // Validate all required fields are present
        if (!username || !password) {
            return res.status(400).json({ message: "Please provide username and password" });
        }

        // Find user by username
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});