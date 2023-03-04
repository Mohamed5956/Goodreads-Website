const express = require("express");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const router = express.Router();
const authorModel = require("../models/author");

router.get("/", async (req, res) => {
  try {
    const authors = await authorModel.find({});
    res.send(authors);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const author = await authorModel.findById({ _id: id });
    res.send(author);
  } catch (e) {
    res.send(e);
  }
});

router.post("/", admin, async (req, res) => {
  const author = new authorModel(req.body);
  try {
    await author.save();
    res.send(author);
  } catch (e) {
    res.send(e);
  }
});

router.patch("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const updatedAuthor = req.body;
  try {
    const author = await authorModel.findByIdAndUpdate(id, updatedAuthor);
    res.send(updatedAuthor);
  } catch (e) {
    res.send(e);
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const author = await authorModel.findByIdAndDelete({ _id: id });
    res.send(author);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
