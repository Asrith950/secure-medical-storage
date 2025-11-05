require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const fs = require('fs');

// Debug environment variables
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const medicalRecordRoutes = require('./routes/medicalRecord');
const reminderRoutes = require('./routes/reminder');
const healthTipRoutes = require('./routes/healthTip');
const chatbotRoutes = require('./routes/chatbot');
const aiRoutes = require('./routes/ai');
const demoMode = require('./middleware/demoMode');

// Create Express app
const app = express();

// Trust proxy for development (fixes rate limiter warning)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", 'https://www.noupe.com'],
    styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    fontSrc: ["'self'", 'https://fonts.gstatic.com'],
    imgSrc: ["'self'", 'data:', 'blob:', 'https://www.noupe.com'],
    connectSrc: ["'self'", 'https://www.noupe.com'],
    frameSrc: ["'self'", 'https://www.noupe.com']
  }
}));

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiting to all requests
app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve uploaded files (with proper security)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', demoMode, authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/health-tips', healthTipRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/ai', aiRoutes);

// Serve React client build if present (production)
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
if (fs.existsSync(clientBuildPath)) {
  console.log('✅ Found client build. Serving static files from:', clientBuildPath);
  app.use(express.static(clientBuildPath));
  // For any other route, serve index.html so React Router can handle routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  console.log('ℹ️  No client build found at', clientBuildPath, '- frontend will not be served by backend.');
}
// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong on the server',
  });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
// Use trimmed env var if present, otherwise fall back to local MongoDB
const rawMongoUri = process.env.MONGODB_URI;
const MONGODB_URI = rawMongoUri && rawMongoUri.trim().length > 0
  ? rawMongoUri.trim()
  : 'mongodb://localhost:27017/medical-storage';

// Helper to mask credentials in a Mongo URI for safe logging
function maskMongoUri(uri) {
  if (!uri) return '';
  try {
    // If credentials exist (username:password@), replace them with '***'
    const at = uri.indexOf('@');
    if (at > -1) {
      const prefix = uri.substring(0, uri.indexOf('//') + 2);
      const suffix = uri.substring(at + 1);
      return `${prefix}***@${suffix}`;
    }
  } catch (e) {
    // ignore and fallback to original
  }
  return uri;
}

// Log the effective MongoDB configuration (masked)
const masked = maskMongoUri(MONGODB_URI);
console.log('Using MongoDB URI (masked):', /localhost|127\.0\.0\.1/.test(MONGODB_URI) ? 'localhost' : masked);

// Start server first, then try to connect to MongoDB
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend: http://localhost:3000`);
  console.log(`Backend API: http://localhost:${PORT}`);
});

// Try to connect to MongoDB (optional for demo)
// Detect if using local MongoDB or Atlas
const isLocalMongoDB = /localhost|127\.0\.0\.1/.test(MONGODB_URI);

// In production, warn loudly if the MongoDB URI still points to localhost
if (process.env.NODE_ENV === 'production' && isLocalMongoDB) {
  console.warn('⚠️  NODE_ENV=production but MONGODB_URI points to localhost.');
  console.warn('   Set the MONGODB_URI environment variable to your MongoDB Atlas (or other remote) connection string.');
}

// Connection options - different for local vs Atlas
const mongooseOptions = isLocalMongoDB
  ? {
      // Local MongoDB - no SSL
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  : {
      // MongoDB Atlas - needs SSL
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

mongoose
  .connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('✅ Connected to MongoDB - Database features enabled');
    console.log(`   Database: ${isLocalMongoDB ? 'Local MongoDB' : 'MongoDB Atlas'}`);
  })
  .catch((err) => {
    console.log('⚠️  MongoDB connection failed - Website will run in demo mode');
    console.log('   Error:', err.message);
    console.log('   Install MongoDB or use MongoDB Atlas for full database features');
    console.log('   The website frontend will work perfectly without database!');
  });