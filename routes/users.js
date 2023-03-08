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
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update with your Angular app URL
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
