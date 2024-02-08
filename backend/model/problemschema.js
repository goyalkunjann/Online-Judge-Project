const mongoose = require('mongoose');

// Define the schema for a coding problem
const problemSchema = new mongoose.Schema({
    // Unique identifier for the problem
    title: {
        type: String,
        required: true,
        unique: true
    },
    // Detailed problem statement
    description: {
        type: String,
        required: true
    },
    // Difficulty level of the problem (Easy, Medium, Hard)
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard']
    },
    // Example input and output to help users understand the problem requirements
    sampleInput: {
        type: String,
        required: true
    },
    sampleOutput: {
        type: String,
        required: true
    },
    // An array of test cases, each with its own input and expected output, used for evaluating submissions
    testCases: [{
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        }
    }],
    // Categories or tags to help classify problems (e.g., algorithms, data structures)
    tags: [{
        type: String
    }],
    // Constraints for submissions to ensure they run efficiently
    timeLimit: { // in seconds
        type: Number,
        required: true
    },
    memoryLimit: { // in MB
        type: Number,
        required: true
    }
});

// Create a model from the schema
module.exports = mongoose.model("Problem", problemSchema);