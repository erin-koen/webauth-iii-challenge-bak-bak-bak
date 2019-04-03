const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//bring in routes
const authRoute = require("./Data/Routes/authRoute.js");
const userRoute = require("./Data/Routes/userRoute.js")


//declare server
const server = express();

//run global middleware
server.use(helmet());
server.use(express.json());
server.use(cors());

//assign routes
server.use("/api/auth", authRoute);
server.use("/api/users", userRoute);

// root route
server.get("/", (req, res) => {
  res.send("Everyting is A-OK");
});

module.exports = server;
