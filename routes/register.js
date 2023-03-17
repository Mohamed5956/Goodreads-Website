const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;
const upload = require("../middlewares/upload");
const fs = require("fs");
const path = require("path");
const DEFAULT_IMAGE = "user.jpg";

router.post("/", upload("user").single("image"), async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    let image = req.file ? req.file.filename : DEFAULT_IMAGE;
    if (!(email && password && firstname && lastname && image)) {
      res.status(400).json("All input is required");
    } else {
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        if (req.file) {
          const imagePath = path.join(
            __dirname,
            "../assets/uploads/user",
            req.file.filename
          );
          fs.unlinkSync(imagePath);
        }
        return res.status(409).json("User Already Exist. Please Login");
      }

      encryptedPassword = await bcrypt.hash(password, 10);

      let user;
      try {
        user = await User.create({
          firstname,
          lastname,
          email: email.toLowerCase(),
          password: encryptedPassword,
          image,
        });
      } catch (err) {
        // Delete the uploaded image if it exists
        if (req.file) {
          const imagePath = path.join(
            __dirname,
            "../assets/uploads/user",
            req.file.filename
          );
          fs.unlinkSync(imagePath);
        }
        throw err;
      }

      const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY);
      user.token = token;
      return res.status(201).json("success");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
