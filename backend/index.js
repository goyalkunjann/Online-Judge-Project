const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { DBConnection } = require("./database/db");
const { config } = require("dotenv");
require("dotenv").config();
const PORT = process.env.PORT || config.env.PORT;
const Problem = require("./model/problemscehma.js")
const User = require("./model/userschema.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DBConnection();

app.get("/", (req, res) => {
    res.send("Welcome");
});

// Register API endpoint
app.post("/register", async(req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;

        if (!firstname || !lastname || !username || !email || !password) {
            return res.status(400).send("Please enter all the required details");
        }

        const doesUserExist = await User.findOne({ username });
        if (doesUserExist) {
            return res.status(200).send(`User ${username} already exists`);
        }


        const hashedPassword = await bcrypt.hash(password, 12);

        const userData = await User.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: userData._id, username },
            process.env.SECRET_KEY, { expiresIn: "1h" }
        );

        userData.password = undefined;

        res.status(200).json({ message: "You have successfully registered!", userData });
    } catch (error) {
        console.log("Error:" + error.message);
    }
});

// Login API endpoint
app.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send("Please enter all the required details");
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(200).send(`User ${username} does not exist. Please register.`);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Incorrect Password.");
        }

        const token = jwt.sign({ id: user._id, username }, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });

        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged In!",
            success: true,
            token
        });
    } catch (error) {
        console.log("Error:" + error.message);
    }
});

// Problem API endpoint
app.post("/problem", async(req, res) => {
    try {
        const { title, description, inputFormat, outputFormat, difficulty, tag, constraints, sampleinput, sampleoutput, testCases } = req.body;

        if (!title || !description || !difficulty || !tag || !sampleinput || !sampleoutput || !testCases) {
            return res.status(400).send("Please enter all the required details including test cases.");
        }

        const problem = await Problem.create({
            title,
            description,
            inputFormat,
            outputFormat,
            difficulty,
            tag,
            constraints,
            sampleinput,
            sampleoutput,
            testCases
        });

        return res.status(201).json({
            message: "Problem added successfully",
            problem,
        });
    } catch (error) {
        console.log("Error adding problem:", error.message);
        return res.status(500).json({ message: "Error adding problem" });
    }
});

app.get("/problem/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const problem = await Problem.findById(id);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        return res.status(200).json(problem);
    } catch (error) {
        console.log("Error retrieving problem:", error.message);
        return res.status(500).json({ message: "Error retrieving problem" });
    }
});

app.get("/problems", async(req, res) => {
    try {
        const problems = await Problem.find({});
        return res.status(200).json(problems);
    } catch (error) {
        console.log("Error retrieving problems:", error.message);
        return res.status(500).json({ message: "Error retrieving problems" });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});