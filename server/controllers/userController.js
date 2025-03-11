const {User} = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const register = async (req, res) => {
    const { email, password } = req.body;
    console.log("hello");
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        const saveUser = await newUser.save();

        const token = jwt.sign(
            {
                userId: newUser._id,
                email: newUser.email,
            },
            process.env.JWT_SECRET || 'defaultSecret',  // Fallback secret
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600 * 1000,
        });

        return res.status(201).json({
            message: "User registered successfully",
            userId: newUser._id,
        });
    } catch (error) {
        console.error("Error in register:", error);  // Improved error log
        return res.status(500).json({ message: "Error registering user", error });
    }
};
  
  const login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(409).json({ message: "Invalid credentials" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(409).json({ message: "Invalid credentials" });
      }
      console.log(user._id);
  
      const token = jwt.sign(
        {
          userId: user.user_id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600 * 1000,
      });
  
      return res.status(200).json({
        message: "Login successful",
        userId: user.user_id,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error logging in" });
    }
  };

  module.exports = { register, login};