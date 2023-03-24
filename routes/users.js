const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const reviewModel = require("../models/review");

// one user -------------

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await userModel.findOne({ email: email });
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});
  
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const user = await userModel.findByIdAndUpdate(id, updatedData);
    res.send(updatedData);
  } catch (e) {
    res.send(e);
  }
 });
 
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


module.exports = router;
