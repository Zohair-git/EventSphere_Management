const mongoose = require("mongoose");

const ExhibitorSchema = mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.ObjectId,
            ref: 'UserModel',
            required: true
        },
        CompanyName:
         { type: String,
         required: true,
         },

        Logo: 
        { type: String,
          required:true 
        },

        Description:
         { type: String,
           required:true
         },

         ContactDetails: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^\d{11}$/.test(v); // Only 11 digits allowed
                },
                message: 'Number is not valid' // Custom message if validation fails
            }
        },

         ProductCategories:
         { type: String,
           required:true
         },
         userID: {
            type: mongoose.Schema.ObjectId,
            ref: 'boothModel',
            required: true
        },
    }
);

const ExhibitorUser = mongoose.model("Exhibitor", ExhibitorSchema);

module.exports = { ExhibitorUser };
