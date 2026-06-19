const express = require('express');
const router = express.Router();
const ContactSubmission = require('../models/ContactSubmission');

// Get all contact submissions
router.get('/', async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get contact submission by ID
router.get('/:id', async (req, res) => {
  try {
    const submission = await ContactSubmission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new contact submission
router.post('/', async (req, res) => {
  try {
    const submission = new ContactSubmission(req.body);
    const newSubmission = await submission.save();
    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update contact submission status
router.put('/:id', async (req, res) => {
  try {
    const submission = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!submission) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.json(submission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete contact submission
router.delete('/:id', async (req, res) => {
  try {
    const submission = await ContactSubmission.findByIdAndDelete(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get submissions by status
router.get('/status/:status', async (req, res) => {
  try {
    const submissions = await ContactSubmission.find({ 
      status: req.params.status 
    }).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get submissions count by status
router.get('/stats/count', async (req, res) => {
  try {
    const stats = await ContactSubmission.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const statusCounts = {};
    stats.forEach(stat => {
      statusCounts[stat._id] = stat.count;
    });
    
    res.json(statusCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
