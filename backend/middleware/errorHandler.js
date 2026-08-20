/**
 * Task 3 & Task 5 Requirement: Global Error Handler Middleware
 * 
 * MUST be registered as the LAST middleware in Express.
 * Catches all uncaught errors, formats them into structured JSON,
 * and ensures raw error stack traces are never exposed to the client.
 */

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;

  // Handle Mongoose Validation Error specifically for Task 5 requirement
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  // Handle Duplicate Key Error (MongoDB E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(400).json({
      success: false,
      message: `Duplicate value entered for ${field}. Must be unique.`,
      error: `Resource with this ${field} already exists.`
    });
  }

  // Standard Structured JSON Error Response
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong on the server',
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : (err.error || err.message)
  });
};

module.exports = errorHandler;
