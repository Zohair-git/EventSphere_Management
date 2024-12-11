const mongoose = require("mongoose");

const sessionModelSchema = mongoose.Schema({
    ExpoID: {
        type: mongoose.Schema.ObjectId,
        ref: 'expo_ManagementModel',
        required: true
    },
    title: {
        type: String,
        required: true, 
    },
    Speaker: {
        type: String,
        required: true,
    },
    Location: {
        type: String,
        required: true,    
    },
    StartTime: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > Date.now();  // Ensures StartTime is in the future
            },
            message: 'Start time must be a future date.'
        }
    },
    EndTime: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > Date.now();  // Ensures EndTime is in the future
            },
            message: 'End time must be a future date.'
        }
    }
});

const Session = mongoose.model('Session', sessionModelSchema);

module.exports = {
    Session
};
