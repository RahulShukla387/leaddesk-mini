const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');
const Admin = require('./models/Admin');

const app = express();

// Connect to Database
connectDB();

// Core Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('LeadDesk API is running...');
});

// Automatic Seed Helper for Initial Admin Account with Explicit Hashing
const seedAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: 'admin@leaddesk.com' });
    if (!adminExists) {
      // Explicitly hash default password here
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('AdminPass123!', salt);

      await Admin.create({
        email: 'admin@leaddesk.com',
        password: hashedPassword,
      });
    }
  } catch (err) {
    console.error('Admin seed error:', err.message);
  }
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  seedAdmin();
});