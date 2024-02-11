const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    inputFormat: {
        type: String,
    },
    outputFormat: {
        type: String,
    },
    difficulty: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    constraints: {
        type: String,
    },
    sampleinput: {
        type: String,
        required: true,
    },
    sampleoutput: {
        type: String,
        required: true,
    },
    // Adding testCases field
    testCases: [{
        input: { type: String, required: true },
        output: { type: String, required: true }
    }]
});

module.exports = mongoose.model("Problem", problemSchema);