const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        UserRole:
         { type: String,
         required: true,
         },
        Name: 
        { type: String, 
            required:true
     },

        Email:
         { type: String,
            required:true
          },
        Password:
          { type: String,
             required:true
           },
        PhoneNumber: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^\d{11}$/.test(v); // Only 11 digits allowed
                },
                message: 'Number is not valid' // Custom message if validation fails
            }
        },
        ProfilePic:
            { type: String,
               required:true
             },
    }
);

const users = mongoose.model("users", userSchema);

module.exports = { users };
