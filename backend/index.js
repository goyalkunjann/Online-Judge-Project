const express = require("express");
const app = express();
const { DBConnection } = require("./database/db");
require("dotenv").config();
const PORT = process.env.PORT || 8090;
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Establish database connection
DBConnection();

app.get("/", (req, res) => {
    res.send("Welcome to the Online Judge Project Backend");
});

// Registration API
app.post("/register", async(req, res) => {
    const { firstname, lastname, email, password } = req.body;

    // Check for missing fields
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
    });

    // Generate a token
    const token = jwt.sign({ userId: newUser._id, email: newUser.email },
        process.env.SECRET_KEY, { expiresIn: "1h" }
    );

    // Respond with the new user (excluding the password) and token
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser._id,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
        },
        token,
    });
});

// Login API
app.post("/login", async(req, res) => {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password." });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id, email: user.email },
        process.env.SECRET_KEY, { expiresIn: "1h" }
    );

    // Respond with the user (excluding the password) and token
    res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 3600000) }) // 1 hour
        .status(200)
        .json({
            message: "Logged in successfully",
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            },
            token,
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});