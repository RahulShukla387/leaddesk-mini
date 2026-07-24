const express = require('express');
const router = express.Router();
const { createLead, getLeads, updateLeadStatus } = require('../controllers/leadController');
const validateLead = require('../middleware/validateLead');
const { protect } = require('../middleware/authMiddleware');

// Public route for public form submission
router.post('/', validateLead, createLead);

// Protected routes for Admin dashboard
router.get('/', protect, getLeads);
router.patch('/:id/status', protect, updateLeadStatus);

module.exports = router;