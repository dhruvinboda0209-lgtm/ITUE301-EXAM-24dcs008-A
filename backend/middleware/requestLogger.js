/**
 * Task 3 Requirement: Custom Request Logger Middleware
 * 
 * Executes globally for every incoming request and logs:
 * [METHOD] [PATH] [TIMESTAMP]
 * Example: [GET] /api/v1/books [2026-08-20T10:15:20.000Z]
 */

const requestLogger = (req, res, next) => {
  const method = req.method;
  const path = req.originalUrl || req.url;
  const timestamp = new Date().toISOString();

  console.log(`[${method}] ${path} [${timestamp}]`);
  
  next();
};

module.exports = requestLogger;
