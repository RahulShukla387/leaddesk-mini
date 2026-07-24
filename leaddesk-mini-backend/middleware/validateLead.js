const validateLead = (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required.' });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  if (!message || message.trim().length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters long.' });
  }

  next();
};

module.exports = validateLead;