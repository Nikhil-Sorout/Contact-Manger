const mongoose = require('mongoose');
// creating a schema for data validation
const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // ref means to which schema we are refering to in type
        ref: "User"
    },
    
    name: {
        type: String,
        required: [true, "Enter the contact name"]
    },
    email: {
        type: String,
        required: [true, "Enter the eamil address"]
    },
    phone: {
        type: String,
        required: [true, "Enter the phone number"]
    }

},
    {
        timestamps: true,
    });

// created a mongoose object successfully, now we can use this object to access our database

module.exports = mongoose.model('Contact', contactSchema);