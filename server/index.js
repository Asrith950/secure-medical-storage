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

// Trust proxy for production (Render)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// ✅ CORS for frontend + localhost
const allowedOrigins = [
  "http://localhost:3000",
  "https://secure-medical-storage-frontend.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/api/auth', demoMode, authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/health-tips', healthTipRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/ai', aiRoutes);

// ✅ Root route for Render health check
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running ✅",
    status: "ok"
  });
});

// ✅ Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong on the server',
  });
});

// MongoDB Config
const PORT = process.env.PORT || 5000;
const rawMongoUri = process.env.MONGODB_URI;
const MONGODB_URI = rawMongoUri && rawMongoUri.trim().length > 0
  ? rawMongoUri.trim()
  : 'mongodb://localhost:27017/medical-storage';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err.message));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
