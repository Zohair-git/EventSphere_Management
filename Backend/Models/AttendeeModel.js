const mongoose = require("mongoose");

const AttendeeSchema = mongoose.Schema(
    {
        userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserModel',
        required: true
        },

        Interests:{ 
        type: String,
        required: true,
     },

        RegisteredSession:{
        type: String,
        required:true 
     },
    }
);

const Attendee = mongoose.model("Attendee", AttendeeSchema);

module.exports = { Attendee };
