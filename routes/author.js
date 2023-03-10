const express = require("express");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const router = express.Router();
const authorModel = require("../models/author");
const upload = require("../middlewares/upload");
const fs = require("fs");
const path = require("path");
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

router.post(
  "/",
  [admin, upload("author").single("photo")],
  async (req, res) => {
    const author = new authorModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      description: req.body.description,
      birthDate: req.body.birthDate,
      photo: req.file.filename,
    });
    try {
      await author.save();
      res.send(author);
    } catch (e) {
      res.send(e);
    }
  }
);

router.patch("/:id", admin, async (req, res) => {
  const id = req.params.id;
  const updatedAuthor = req.body;
  try {
    const author = await authorModel.findByIdAndUpdate(id, updatedAuthor);
    res.send(updatedAuthor);
  } catch (e) {
    res.send(e);
  }
});

router.delete("/:id", admin, async (req, res) => {
  const id = req.params.id;
  try {
    const author = await authorModel.findByIdAndDelete({ _id: id });
    res.send(author);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
