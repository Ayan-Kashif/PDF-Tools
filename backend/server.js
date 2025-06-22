// server.js - Corrected version
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes PROPERLY
const pdfRoutes = require('./routes/pdfRoutes');
const utilityRoutes = require('./routes/utilityRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect('mongodb://localhost:27017/pdf-tools', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Use routes CORRECTLY
app.use('/api/pdf', pdfRoutes);  // Make sure pdfRoutes is a Router object
app.use('/api/utility', utilityRoutes);  // Make sure utilityRoutes is a Router object

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));