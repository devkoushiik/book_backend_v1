const express = require("express");
const Book = require("../model/bookModel");

const router = express.Router();

// Route for save books
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send All Require Field: Title, Author, PublishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
// Getting data
router.get("/", async (req, res) => {
  try {
    const allBook = await Book.find({});
    res.status(200).json({
      count: allBook.length,
      data: allBook,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// Getting data by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleBook = await Book.findById(id);

    res.status(200).json({
      count: singleBook.length,
      data: singleBook,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// updating data
router.put("/:id", async (req, res) => {
  try {
    // checking body
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send All Require Field: Title, Author, PublishYear",
      });
    }

    // extracting id
    const { id } = req.params;

    // need 2 item, id and body
    const updateBook = await Book.findByIdAndUpdate(id, req.body);
    //fail
    if (!updateBook) return res.status(404).json({ message: "Book not found" });
    // found
    res.status(200).json({
      message: "Update successful. :)",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// delete route
router.delete("/:id", async (req, res) => {
  try {
    // extracting from body
    const { id } = req.params;
    //query
    const result = await Book.findByIdAndDelete(id);

    // if fail
    if (!result)
      return res.status(404).json({
        message: "Book not found",
      });

    // success
    return res.status(200).send({ message: "Book delete successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
