const mongoose = require("mongoose");

const FeedBackSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserModel',
        required: true
    },
    expoID: {
        type: mongoose.Schema.ObjectId,
        ref: 'expo_MaganementModel',
        required: true
    },
    
    Content: {
        type: String, 
        required: true,
    },
    TimeStamp: {
        type: Date,   
        required: true
    },
});

const FeedBack = mongoose.model('FeedBack', FeedBackSchema);

module.exports = {
    FeedBack
};
