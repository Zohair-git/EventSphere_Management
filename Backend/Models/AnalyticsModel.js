const mongoose = require("mongoose");

const AnalyticsSchema = mongoose.Schema({
    ExpoID: {
        type: mongoose.Schema.ObjectId,
        ref: 'expo_ManagementModel',
        required: true
    },
    AttendeeEngagement: {
        type: Number,
        required: true
    },
    BoothTrafic: {
        type: String, 
        required: true,
        maxlength: 300  
    },
    PopularSession: {
        type: String,   
        required: true
    },
});

const Analytics = mongoose.model('Analytics', AnalyticsSchema);

module.exports = {
    Analytics
};
