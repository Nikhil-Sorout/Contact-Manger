const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: [true,"Please anter the username"]
    },
    email:{
        type: String,
        required: [true,"Please enter the email address"],
        unique: [true,"User already registerd with this email address"]
    },
    password:{
        type: String,
        required: [true, "Please enter a password"]
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);