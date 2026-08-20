/**
 * Task 3: Borrowings REST API Router (In-Memory Data Store)
 */
const express = require('express');
const router = express.Router();

// Initial sample borrowing records
let borrowings = [
  {
    id: "br-101",
    memberName: "Aarav Sharma",
    bookTitle: "Clean Code: A Handbook of Agile Software Craftsmanship",
    borrowDate: "2026-08-10",
    returnDate: "2026-08-24",
    status: "borrowed",
    createdAt: new Date().toISOString()
  },
  {
    id: "br-102",
    memberName: "Priya Patel",
    bookTitle: "System Design Interview – An Insider's Guide",
    borrowDate: "2026-08-01",
    returnDate: "2026-08-15",
    status: "overdue",
    createdAt: new Date().toISOString()
  }
];

/**
 * @route   GET /api/v1/borrowings
 * @desc    Task 3 Endpoint: Return all borrowing records
 * @access  Public
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: borrowings.length,
    data: borrowings
  });
});

/**
 * @route   POST /api/v1/borrowings
 * @desc    Task 3 Endpoint: Create a new borrowing record
 * @access  Public
 */
router.post('/', (req, res, next) => {
  try {
    const { memberName, bookTitle, borrowDate, returnDate } = req.body;

    // Basic Validation
    if (!memberName || !bookTitle || !borrowDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: All fields (memberName, bookTitle, borrowDate, returnDate) are required."
      });
    }

    if (new Date(returnDate) < new Date(borrowDate)) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: Return date cannot be earlier than borrow date."
      });
    }

    const newBorrowing = {
      id: `br-${Date.now()}`,
      memberName,
      bookTitle,
      borrowDate,
      returnDate,
      status: req.body.status || "borrowed",
      createdAt: new Date().toISOString()
    };

    borrowings.unshift(newBorrowing);

    // Return 201 Created Status Code as specified in Task 3
    res.status(201).json({
      success: true,
      message: "Borrowing request created successfully",
      data: newBorrowing
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
