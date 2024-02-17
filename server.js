const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
// dotenv module with config allows us to use process module with which we are able to fetch the port from .env file
const dotenv = require("dotenv").config();

// connecting to the database
connectDb();

const app = express();
// we can also import our port from .env file using the process module which is a core module of node
const port = process.env.PORT || 5000;

// Using json to recieve data from the client side, data is attached to the body of request
app.use(express.json());

// Creating a separate directory for routes to keep our code clean
// Using a middleware function
app.use('/api/contacts', require('./routes/contactRoutes'));
// middleware function for user realted task such as register, login and current user
app.use('/api/users', require('./routes/userRoutes'));

// using errorHandler middleware
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})
// console.log("Hey I am back");
