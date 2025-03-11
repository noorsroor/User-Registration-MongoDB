
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const connectDB = require('./config/db');  // Import the connectDB function
require('dotenv').config();
const moongose = require('mongoose');
const authRoute = require("./routes/userRoute");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (_, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);

connectDB();
app.use("/auth", authRoute);


// Start the Express server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀Server running on http://localhost:${PORT}`);
});
