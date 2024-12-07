const mongoose = require("mongoose");

const Booth_Schema = mongoose.Schema(
    {
        boothNumber:
         { type: String,
         required: true,
         maxlength: 10 },

        size: 
        { type: String, 
        maxlength: 50 },

        locationOnFloor:
         { type: String,
         maxlength: 100 }
    }
);

const boothschema = mongoose.model("booths", Booth_Schema);

module.exports = { boothschema };
