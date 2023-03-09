const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");

// one user -------------

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await userModel.find({ email: email });
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
