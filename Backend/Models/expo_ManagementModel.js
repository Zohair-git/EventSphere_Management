const mongoose = require("mongoose");


const expoEventSchema =  mongoose.Schema({
    title: {
    type: String, 
    required: true,
    maxlength: 200 
},
    date: {
    type: Date,
    required: true 
},
    location: {
    type: String,
    required: true, 
    maxlength: 300 
},
    booths: {
    type: mongoose.Schema.ObjectId,
    ref: 'boothModel',
    required: true
 },
    description: { 
    type: String
 },

    theme: {
    type: String,
    maxlength: 100
 }

});

const ExpoEvent = mongoose.model('expo_management', expoEventSchema);

module.exports = {
    ExpoEvent
}