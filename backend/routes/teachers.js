const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find({ status: 'active' }).sort({ name: 1 });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get teacher by ID
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new teacher
router.post('/', async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update teacher
router.put('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete teacher (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { status: 'inactive' },
      { new: true }
    );
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get teachers by department
router.get('/department/:department', async (req, res) => {
  try {
    const teachers = await Teacher.find({ 
      department: req.params.department, 
      status: 'active' 
    }).sort({ name: 1 });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get teachers by subject
router.get('/subject/:subject', async (req, res) => {
  try {
    const teachers = await Teacher.find({ 
      subject: req.params.subject, 
      status: 'active' 
    }).sort({ name: 1 });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
