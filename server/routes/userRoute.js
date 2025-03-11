const express = require("express");
const authRoute=express.Router();

const verify =require("../middlewares/verify");
const {register,login} =require("../controllers/userController");

authRoute.post("/register", register);
authRoute.post('/login', login);

authRoute.get("/check", verify,  (req, res) => {
    res.status(200).json({ message: "API is working" });
  });
  
module.exports = authRoute;