/**
 * Task 5, 8, & 9: MongoDB Mongoose Demonstration Router
 * 
 * Provides routes to:
 * 1. Test MongoDB Connection & Database Operations (Seed/Read)
 * 2. Demonstrate Mongoose Validation Failure handling with structured 400 JSON.
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/Book');
const Member = require('../models/Member');
const Borrowing = require('../models/Borrowing');

/**
 * @route   GET /api/v1/demo/status
 * @desc    Check MongoDB connection status
 */
router.get('/status', (req, res) => {
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  const currentState = states[mongoose.connection.readyState] || 'Unknown';

  res.status(200).json({
    success: true,
    mongoConnectionStatus: currentState,
    databaseName: mongoose.connection.name || 'Not Connected'
  });
});

/**
 * @route   POST /api/v1/demo/seed
 * @desc    Task 8 Requirement: Controlled MongoDB Operation Demo
 *          Creates sample member, book, and borrowing in MongoDB.
 */
router.post('/seed', async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "MongoDB is not currently connected. Please configure MONGO_URI in .env"
      });
    }

    // Upsert Sample Member
    const member = await Member.findOneAndUpdate(
      { email: 'student.demo@itue301.edu' },
      {
        name: 'Devansh Verma',
        email: 'student.demo@itue301.edu',
        phone: '+91 9876543210',
        department: 'Computer Science & Engineering'
      },
      { upsert: true, new: true, runValidators: true }
    );

    // Upsert Sample Book
    const book = await Book.findOneAndUpdate(
      { isbn: '978-0132350884-DEMO' },
      {
        title: 'Clean Code Architecture Demo',
        author: 'Robert C. Martin',
        category: 'Software Engineering',
        isbn: '978-0132350884-DEMO',
        available: true
      },
      { upsert: true, new: true, runValidators: true }
    );

    // Create Sample Borrowing using Mongoose References
    const borrowing = await Borrowing.create({
      memberId: member._id,
      bookId: book._id,
      borrowDate: new Date(),
      returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // +14 days
      status: 'borrowed'
    });

    // Populate references to verify populate works
    const populatedBorrowing = await Borrowing.findById(borrowing._id)
      .populate('memberId', 'name email department')
      .populate('bookId', 'title author category isbn');

    res.status(201).json({
      success: true,
      message: 'Task 8 Demo: MongoDB document creation & reference populate successful!',
      data: {
        member,
        book,
        borrowing: populatedBorrowing
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   GET /api/v1/demo/test-validation
 * @desc    Task 9 Requirement: Mongoose Validation Failure Demonstration
 *          Attempts to save invalid documents (missing required fields / invalid status enum)
 *          and returns structured JSON with HTTP 400.
 */
router.get('/test-validation', async (req, res, next) => {
  try {
    // Intentionally create an invalid Borrowing document with:
    // 1. Missing required memberId and bookId
    // 2. Invalid status enum value 'invalid-status-type'
    const invalidBorrowing = new Borrowing({
      status: 'invalid-status-type',
      // Missing memberId, bookId, borrowDate, returnDate
    });

    // Execute validation (will fail)
    await invalidBorrowing.validate();

    // If somehow validation passes (unlikely), return success
    res.status(200).json({ success: true, message: "Validation passed unexpectedly" });
  } catch (err) {
    // Pass error to global errorHandler middleware
    next(err);
  }
});

module.exports = router;
