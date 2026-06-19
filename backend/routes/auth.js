const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Parent = require('../models/Parent');
const Receptionist = require('../models/Receptionist');
const Manager = require('../models/Manager');

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    let user = null;
    let userModel = null;
    
    // Determine which model to use based on role
    switch (role) {
      case 'admin':
        userModel = Admin;
        break;
      case 'teacher':
        userModel = Teacher;
        break;
      case 'student':
        userModel = Student;
        break;
      case 'parent':
        userModel = Parent;
        break;
      case 'receptionist':
        userModel = Receptionist;
        break;
      case 'manager':
        userModel = Manager;
        break;
      default:
        return res.status(400).json({ message: 'Invalid role specified' });
    }
    
    // Find user by username or email
    user = await userModel.findOne({
      $or: [
        { username: username },
        { email: username }
      ],
      status: 'active'
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password (in production, use bcrypt to compare hashed passwords)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Create user session data (exclude password)
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: role,
      profileImage: user.profileImage || ''
    };
    
    // Add role-specific data
    if (role === 'teacher') {
      userData.department = user.department;
      userData.subject = user.subject;
    } else if (role === 'student') {
      userData.class = user.class;
      userData.rollNumber = user.rollNumber;
    } else if (role === 'parent') {
      userData.children = user.children;
    }
    
    res.json({
      message: 'Login successful',
      user: userData,
      token: 'dummy_token_' + Date.now() // In production, use JWT
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user profile
router.get('/profile/:role/:id', async (req, res) => {
  try {
    const { role, id } = req.params;
    
    let userModel = null;
    
    switch (role) {
      case 'admin':
        userModel = Admin;
        break;
      case 'teacher':
        userModel = Teacher;
        break;
      case 'student':
        userModel = Student;
        break;
      case 'parent':
        userModel = Parent;
        break;
      case 'receptionist':
        userModel = Receptionist;
        break;
      case 'manager':
        userModel = Manager;
        break;
      default:
        return res.status(400).json({ message: 'Invalid role specified' });
    }
    
    const user = await userModel.findById(id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile/:role/:id', async (req, res) => {
  try {
    const { role, id } = req.params;
    const updateData = req.body;
    
    // Remove sensitive fields from update data
    delete updateData.password;
    delete updateData.role;
    delete updateData.status;
    
    let userModel = null;
    
    switch (role) {
      case 'admin':
        userModel = Admin;
        break;
      case 'teacher':
        userModel = Teacher;
        break;
      case 'student':
        userModel = Student;
        break;
      case 'parent':
        userModel = Parent;
        break;
      case 'receptionist':
        userModel = Receptionist;
        break;
      case 'manager':
        userModel = Manager;
        break;
      default:
        return res.status(400).json({ message: 'Invalid role specified' });
    }
    
    const user = await userModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
