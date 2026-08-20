/**
 * LibraX — Smart Library Management System Backend Server
 * ITUE301 Advanced Web Development Frameworks
 */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import Middleware
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

// Import Routers
const { router: booksRouter } = require('./routes/books');
const borrowingsRouter = require('./routes/borrowings');
const demoRouter = require('./routes/demo');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman/mobile apps/curl)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for local viva evaluation
    },
    credentials: true
  })
);

// Express Body Parser Middleware
app.use(express.json());

// Task 3 Requirement: Custom Request Logger Middleware applied globally
app.use(requestLogger);

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'LibraX Express REST API is operational',
    timestamp: new Date().toISOString()
  });
});

// Task 3 REST API Routes
app.use('/api/v1/books', booksRouter);
app.use('/api/v1/borrowings', borrowingsRouter);
app.use('/api/v1/demo', demoRouter);

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found`
  });
});

// Task 3 & 5 Requirement: Global Error Handler MUST be the last middleware
app.use(errorHandler);

// Task 5: MongoDB Connection Setup using Mongoose and process.env.MONGO_URI
const connectDatabase = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri || mongoUri.includes('your_mongodb_connection_string')) {
    console.log('⚠️ MONGO_URI is not configured in .env. MongoDB features running in standby mode.');
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB successfully!');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
  }
};

// Start Express Server
app.listen(PORT, async () => {
  console.log(`🚀 LibraX Server active on http://localhost:${PORT}`);
  console.log(`📌 Task 3 Endpoints ready:`);
  console.log(`   - GET  http://localhost:${PORT}/api/v1/books`);
  console.log(`   - GET  http://localhost:${PORT}/api/v1/borrowings`);
  console.log(`   - POST http://localhost:${PORT}/api/v1/borrowings`);
  console.log(`📌 Task 5 Demo Endpoints ready:`);
  console.log(`   - GET  http://localhost:${PORT}/api/v1/demo/status`);
  console.log(`   - POST http://localhost:${PORT}/api/v1/demo/seed`);
  console.log(`   - GET  http://localhost:${PORT}/api/v1/demo/test-validation`);
  
  await connectDatabase();
});
