const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    posting: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    requiredSkill: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.model('Job', jobSchema);