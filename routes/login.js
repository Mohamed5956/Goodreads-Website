const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY);

      user.token = token;
      res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update with your Angular app URL
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.status(200).send("success");
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
