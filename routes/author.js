const express = require("express");
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

router.post("/", async (req, res) => {
  const author = new authorModel(req.body);
  try {
    await author.save();
    res.send(author);
  } catch (e) {
    res.send(e);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const author = await authorModel.findByIdAndUpdate(id);
    res.send(author);
  } catch (e) {
    res.send(e);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const author = await authorModel.findByIdAndDelete({ _id: id });
    res.send(author);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;