const express = require("express");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const router = express.Router();
const authorModel = require("../models/author");

router.get("/", async (req, res) => {
  try {
    const authors = await authorModel.find({});
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update with your Angular app URL
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send(authors);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const author = await authorModel.findById({ _id: id });
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update with your Angular app URL
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send(author);
  } catch (e) {
    res.send(e);
  }
});

router.post("/", async (req, res) => {
  const author = new authorModel(req.body);
  try {
    await author.save();
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update with your Angular app URL
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send(author);
  } catch (e) {
    res.send(e);
  }
});

router.patch("/:id", admin, async (req, res) => {
  const id = req.params.id;
  const updatedAuthor = req.body;
  try {
    const author = await authorModel.findByIdAndUpdate(id, updatedAuthor);
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update with your Angular app URL
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send(updatedAuthor);
  } catch (e) {
    res.send(e);
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const author = await authorModel.findByIdAndDelete({ _id: id });
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update with your Angular app URL
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send(author);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
