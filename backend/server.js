// ─── Load ENV FIRST ───────────────────────────────────────────────────────────
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();

// ─── Validate ENV ─────────────────────────────────────────────────────────────
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI missing in .env");
  process.exit(1);
}

// ─── Rate Limiting (Fixed for Dev) ────────────────────────────────────────────
// General API Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Increased for development to prevent blocking
  message: { success: false, message: 'Too many requests from this IP.' }
});

// Auth Limiter (The one that caused your 429 error)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 50, // Increased from 10 to 50 so you don't get locked out while testing
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again after 15 minutes.' }
});

// ─── Middleware ───────────────────────────────────────────────────────────────
// Enhanced CORS for local and production URLs
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  'http://localhost:3000',
  'http://localhost:3001'
].filter(Boolean); // Removes undefined values

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '15mb' })); // Increased limit for larger data/images
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Static Folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── MongoDB Connection ───────────────────────────────────────────────────────
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ DB Error:', err.message);
    process.exit(1);
  }
};

connectDB();

// ─── Routes ───────────────────────────────────────────────────────────────────

// Apply general limiter to all /api routes
app.use('/api', limiter);

// Apply strict auth limiter specifically to authentication
app.use('/api/auth', authLimiter, require('./routes/auth'));

// Other standard routes
app.use('/api/homepage', require('./routes/homepage'));
app.use('/api/cranes', require('./routes/cranes'));
app.use('/api/services', require('./routes/services'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/about', require('./routes/about'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/faqs', require('./routes/faqs'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/settings', require('./routes/settings'));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'online',
    db_status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date()
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(`🔥 [${new Date().toISOString()}] Error:`, err.stack || err.message);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Only show stack trace in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`🔗 URL → http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('❌ Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

// // ─── Load ENV FIRST (VERY IMPORTANT) ──────────────────────────────────────────
// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const rateLimit = require('express-rate-limit');

// const app = express();

// // ─── DEBUG ENV (TEMP - REMOVE AFTER TEST) ─────────────────────────────────────
// console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI ? "Loaded ✅" : "Missing ❌");

// // ─── Rate Limiting ────────────────────────────────────────────────────────────
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: { success: false, message: 'Too many requests, please try again later.' }
// });

// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 10,
//   message: { success: false, message: 'Too many login attempts, please try again later.' }
// });

// // ─── Middleware ───────────────────────────────────────────────────────────────
// app.use(cors({
//   origin: [
//     process.env.FRONTEND_URL || 'http://localhost:3000',
//     process.env.ADMIN_URL || 'http://localhost:3001',
//   ],
//   credentials: true,
// }));

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api', limiter);

// // ─── MongoDB Connection (SAFE VERSION) ────────────────────────────────────────
// const connectDB = async () => {
//   try {
//     if (!process.env.MONGODB_URI) {
//       throw new Error("MONGODB_URI is missing in .env file");
//     }

//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log('✅ MongoDB Connected Successfully');
//   } catch (err) {
//     console.error('❌ MongoDB Connection Error:', err.message);
//     process.exit(1);
//   }
// };

// connectDB();

// // ─── Routes ───────────────────────────────────────────────────────────────────
// app.use('/api/auth', authLimiter, require('./routes/auth'));
// app.use('/api/homepage', require('./routes/homepage'));
// app.use('/api/cranes', require('./routes/cranes'));
// app.use('/api/services', require('./routes/services'));
// app.use('/api/projects', require('./routes/projects'));
// app.use('/api/blogs', require('./routes/blogs'));
// app.use('/api/about', require('./routes/about'));
// app.use('/api/contact', require('./routes/contact'));
// app.use('/api/clients', require('./routes/clients'));
// app.use('/api/faqs', require('./routes/faqs'));
// app.use('/api/upload', require('./routes/upload'));
// app.use('/api/settings', require('./routes/settings'));

// // ─── Health Check ─────────────────────────────────────────────────────────────
// app.get('/api/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'ASP Cranes API is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // ─── 404 Handler ──────────────────────────────────────────────────────────────
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: 'Route not found' });
// });

// // ─── Global Error Handler ─────────────────────────────────────────────────────
// app.use((err, req, res, next) => {
//   console.error('🔥 Global Error:', err);

//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || 'Internal Server Error',
//     ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
//   });
// });

// // ─── Start Server ─────────────────────────────────────────────────────────────
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
// });

// module.exports = app;