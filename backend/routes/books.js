/**
 * Task 3 & Task 4: Books REST API Router (In-Memory Data Store)
 */
const express = require('express');
const router = express.Router();

// Professional sample book dataset for Task 3 & 4
let books = [
  {
    id: "b1",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    category: "Software Engineering",
    isbn: "978-0132350884",
    available: true
  },
  {
    id: "b2",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Distributed Systems",
    isbn: "978-1449373320",
    available: true
  },
  {
    id: "b3",
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    category: "Web Development",
    isbn: "978-0596517748",
    available: false
  },
  {
    id: "b4",
    title: "Introduction to Algorithms (CLRS)",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    isbn: "978-0262033848",
    available: true
  },
  {
    id: "b5",
    title: "Modern Operating Systems",
    author: "Andrew S. Tanenbaum",
    category: "Operating Systems",
    isbn: "978-0133591620",
    available: true
  },
  {
    id: "b6",
    title: "System Design Interview – An Insider's Guide",
    author: "Alex Xu",
    category: "System Design",
    isbn: "978-1736049112",
    available: false
  }
];

/**
 * @route   GET /api/v1/books
 * @desc    Task 3 Endpoint: Return all books
 * @access  Public
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});

module.exports = { router, books };
