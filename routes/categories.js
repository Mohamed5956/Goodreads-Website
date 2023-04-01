const express = require("express");
const router = express.Router();
const categoryModel = require("../models/categories");
const booksModel = require("../models/books");
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const fs = require("fs");
const path = require("path");

// display all categories---------------------

router.get("/", async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.send(categories);
  } catch (err) {
    res.send(err);
  }
});

// display one category and her books-------------

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const category = await categoryModel.findById({ _id: id });
    res.send(category);
  } catch (e) {
    res.send(e);
  }
});

// add category -----------------------

router.post(
  "/",
  [ upload("category").single("image")],
  async (req, res) => {
    const path = "/assets/uploads/category/";
    const category = new categoryModel({
      name: req.body.name,
      image: req.file.filename,
    });
    try {
      await category.save();
      res.send(category);
    } catch (e) {
      res.send(e);
    }
  }
);

// update category-----------------------

router.patch(
  "/:id",
  [admin, upload("category").single("image")],
  async (req, res) => {
    const id = req.params.id;
    try {
      const category = await categoryModel.findById(id);
      if (!category) {
        res.status(404).send("category not found");
      }
      if (req.file) {
        const imagePath = path.join(
          __dirname,
          "../assets/uploads/category",
          category.image
        );
        fs.unlinkSync(imagePath);
        category.image = req.file.filename;
      }
      category.name = req.body.name;
      await category.save();
      res.send(category);
    } catch (e) {
      res.send(e);
    }
  }
);

// delete category and her books-----------------------

router.delete("/:id", admin, async (req, res) => {
  const id = req.params.id;
  try {
    const category = await categoryModel.findById({ _id: id });
    if (!category) {
      res.status(404).send("category not found");
    }
    const imagePath = path.join(
      __dirname,
      "../assets/uploads",
      "category",
      category.image
    );
    fs.unlinkSync(imagePath);
    await booksModel.deleteMany({ categoryId: id });
    const deletedCategory = await categoryModel.findByIdAndDelete(id);
    res.send(deletedCategory);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
