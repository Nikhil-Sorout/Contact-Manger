const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// creating a validator for tokens generated for securtiy purpose

const validateToken = asyncHandler(async (req,res,next)=>{
    let token;
    // token is either passed in bearer section or header section as "bearer token"
    // it can be either authorization or Authorization
    let authHeader = await req.headers.authorization || req.headers.Authorization;
    // checking if the user has provided authorization in the header and whether it starts with Bearer or not
    if(authHeader && authHeader.startsWith("Bearer")){
        // splitting the token from the header
        token = authHeader.split(' ')[1];
        // verifying the token with ACCESSS TOKEN SECRET KEY 
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(401);
                throw new Error("Unauthorized access");
            }
            // decoded object will have the user info
            console.log(decoded);
            // attaching the user property from decoded to req body's user property
            req.user = decoded.user;
            // since it is a middleware function control flow has to be passed further
            next();
        });
        // if token is not there or unauthorized access
        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
    }
})

module.exports = validateToken;