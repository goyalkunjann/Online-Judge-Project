const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Problem'
    },
    submissions: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        language: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        verdict: {
            type: String,
            required: true,
            enum: ['Accepted', 'Rejected', 'Runtime Error', 'Time Limit Exceeded', 'Compilation Error'],
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        },
    }],
});

module.exports = mongoose.model("Submission", submissionSchema);