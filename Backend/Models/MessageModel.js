const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    SenderID: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserModel',
        required: true
    },
    ReceiverID: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserModel',
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

const Messages = mongoose.model('Messages', MessageSchema);

module.exports = {
    Messages
};
