const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// POST /api/auth/login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.JWT_SECRET || 'secret123',
        { expiresIn: '1d' }
      );

      return res.status(200).json({
        success: true,
        token,
      });
    } else {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during authentication.' });
  }
};

// POST /api/auth/register (Explicitly hashing password upon credential creation)
exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin email already exists.' });
    }

    // 1. Explicitly generate salt and hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. Save document with hashed password
    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      adminId: newAdmin._id,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error creating admin.' });
  }
};