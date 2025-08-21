const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();
//signUp

authRouter.post("/api/signup/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User with same email already exists!' });
    }
    const hashedPassword = await bcryptjs.hash(password, 8);
    console.log("Hashed Password:", hashedPassword);
    let user = new User({
      email,
      password: hashedPassword,
      name,
    })
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });

  }
});
//SignIn

authRouter.post("/api/logIn/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: 'User with this email doesn\'t exist!' });
    }
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({ msg: 'Incorrect password' });
    }
    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token, ...user._doc });

  } catch (e) {
    res.status(500).json({ error: e.message });

  }
});

module.exports = authRouter;
