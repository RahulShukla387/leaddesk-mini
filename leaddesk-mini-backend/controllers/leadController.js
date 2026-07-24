const Lead = require('../models/Lead');

exports.createLead = async (req, res) => {
  try {
    const { name, email, budgetRange, message } = req.body;
    const newLead = await Lead.create({
      name,
      email,
      budgetRange: budgetRange || '< $5k',
      message,
    });
    res.status(201).json({ success: true, data: newLead });
  } catch (error) {
    res.status(500).json({ error: 'Server error saving lead submission.' });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search && search.trim() !== '') {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    res.status(500).json({ error: 'Server error retrieving leads.' });
  }
};

exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['New', 'Contacted', 'Closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ error: 'Lead record not found.' });
    }

    res.status(200).json({ success: true, data: updatedLead });
  } catch (error) {
    res.status(500).json({ error: 'Server error updating lead status.' });
  }
};