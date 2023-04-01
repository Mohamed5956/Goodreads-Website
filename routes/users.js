const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const reviewModel = require("../models/review");
const fs = require("fs");
const path = require("path");
const upload = require("../middlewares/upload");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// one user -------------

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await userModel.findOne({ email: email });
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

router.patch("/:id", upload("user").single("image"), async (req, res) => {
  const id = req.params.id;
  try {
    const email = req.body.email;
    const oldUser = await userModel.findOne({ email });
    if (oldUser && oldUser._id != id) {
      return res.status(409).json("Email Already Exist");
    }
    const user = await userModel.findById(id);
    if (!user) {
      console.log("User not found");
    } else {
      const originalImage = user.image;
      if (req.file && req.file.name != "user.jpg") {
        const imagePath = path.join(__dirname, "../assets/uploads/user", user.image);
        fs.unlinkSync(imagePath); user.image = req.file.filename;
      }
      encryptedPassword = await bcrypt.hash(req.body.password, 10);
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.email = req.body.email;
      user.password = encryptedPassword;
      await user.save();
      console.log("User saved successfully!");
      return res.json("User updated successfully!");
      if (req.file && req.file.name != "user.jpg" && user.image !== req.file.filename) {
        const imagePath = path.join(__dirname, "../assets/uploads/user", user.image);
        fs.unlinkSync(imagePath);
        user.image = originalImage;
        await user.save();
        console.log("Image reverted successfully!");
      }
    }

  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      console.log("Validation error:", e.errors);
      res.status(400).send(e.errors);
    } else {
      console.log("Error saving user object:", e);
      res.status(500).send("Internal server error");
    }
  }
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const reviews = await reviewModel.deleteMany({ userId: id });
    const user = await userModel.findByIdAndDelete({ _id: id });
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

router.get("/reviews/rates", async (req, res) => {

  try {

    const users = await userModel.find({});
    const UsersId = users.map((user) => user._id);

    let rates = [];
    for (let i = 0; i < users.length; i++) {

      rates.push((await reviewModel.find({ userId: users[i]._id })).length);
    }

    let userrates = [];
    for (let i = 0; i < users.length; i++) {

      
      if (rates[i] == 0) {
        userrates.push(0);
      }
      else if (rates[i] > 0 && rates[i] <= 2) {
        userrates.push(1);
      }
      else if (rates[i] > 2 && rates[i] <= 4) {
        userrates.push(2);
      }
      else if (rates[i] > 4 && rates[i] <= 6) {
        userrates.push(3);
      }
      else if (rates[i] > 6 && rates[i] <= 8) {
        userrates.push(4);
      }
      else {
        userrates.push(5);
      }
    }
    
     rate_users ={
      user:'',
      rate:'',
     }

      let RatesOfUser=[];
     for (let i = 0; i < users.length; i++) {
      rate_users ={
        user:users[i],
        rate:userrates[i],
       }
       RatesOfUser.push(rate_users);
      
    }


    res.send(RatesOfUser);
  } catch (e) {
    res.send(e);
  }
});



module.exports = router;
