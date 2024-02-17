const asyncHandler = require('express-async-handler');

// for user authentication
const jwt = require('jsonwebtoken');

// for password encryption
const bcrypt = require('bcrypt');

const User = require('../models/userModel');

// @desc Login user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }

    // checking if the user is already registered or not
    const user = await User.findOne({ email })

    // if the user is registered already granting an access token by comparing password with hashedPassword using bcrypt.compare
    if (user && await (bcrypt.compare(password, user.password))) {
        // using sign method of jsonwebtoken to create a token for the user
        const accessToken = await jwt.sign({
            // Payload : data of user attached to the token
            user: {
                userName: user.userName,
                email: user.email,
                id: user.id
            }
        },
            // secret access token code : unique
            process.env.ACCESS_TOKEN_SECRET,
            // expiry time for token
            { expiresIn: "15m" })
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("email or password is incorrect");
    }


});

// @desc Register user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const match = await User.findOne({ email });
    if (match) {
        res.status(400);
        throw new Error("Already registered");
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        userName,
        email,
        password: hashedPassword
    })
    console.log("Hashed Password is: ", hashedPassword);
    console.log(newUser);
    if (newUser) {
        res.status(201).json({ _id: newUser.id, email: newUser.email, message: "User registered successfully" });
    }
    else {
        res.status(400);
        throw new Error("User data is not valid")
    }
    // res.json({message: "Register the user"})
});

// @desc current user info
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Current user information" });
});

module.exports = { loginUser, registerUser, currentUser };