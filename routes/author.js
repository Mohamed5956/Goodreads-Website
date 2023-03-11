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

router.patch(
  "/:id",
  [admin, upload("author").single("photo")],
  async (req, res) => {
    const id = req.params.id;
    try {
      const author = await authorModel.findById(id);
      if (!author) {
        res.status(404).send("author not found");
      }
      if (req.file) {
        const imagePath = path.join(
          __dirname,
          "../uploads/author",
          author.photo
        );
        fs.unlinkSync(imagePath);
        author.photo = req.file.filename;
      }
        author.firstName = req.body.name,
        author.lastName =req.body.lastName,
        author.birthDate =req.body.birthDate,
        author.description =req.body.description,
        author.photo =req.file.filename,
    
      await author.save();
      res.status(200).send("author updated successfully");
      res.send(updatedAuthor);
    } catch (e) {
      res.send(e);
    }
  }
);

router.delete("/:id", admin, async (req, res) => {
  const id = req.params.id;
  try {
    const author = await authorModel.findById({ _id: id });
    if (!author) {
      res.status(404).send("author not found");
    }
    const imagePath = path.join(
      __dirname,
      "../assets/uploads",
      "author",
      author.photo
    );
    fs.unlinkSync(imagePath);
    const deletedAuthor = await authorModel.findByIdAndDelete(id);
    res.status(200).send(deletedAuthor);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
