// Use the dotenv package, to create environment variables
require("dotenv").config();

// Create a constant variable, PORT, based on what's in process.env.PORT or fallback to 3000
const { PORT } = process.env;

// Import express, and create a server
const express = require("express");
const app = express();

// Require morgan and body-parser middleware
const morgan = require("morgan");
// Have the server use morgan with setting 'dev'
app.use(morgan("dev"));

// Import cors 
// Have the server use cors()
// cross origin resource sharing policy
const cors = require("cors");
app.use(cors());

// Have the server use bodyParser.json()
// This parses the body and places it into our req obj
app.use(express.json());

// Have the server use your api router with prefix '/api'
const apiRouter = require('./api');
app.use('/api', apiRouter);

// Import the client from your db/index.js
const { client } = require("./db");

// Create custom 404 handler that sets the status code to 404.
app.get("*", (req, res, next) => {
    res.status(404).send("Page not found");
});

// Create custom error handling that sets the status code to 500
// and returns the error as an object
app.use((error, req, res, next) => {
    res.status(500).send(error);
});

// Start the server listening on port PORT
// On success, connect to the database
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})