const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['super_admin', 'admin', 'moderator'],
    default: 'admin'
  },
  permissions: [{
    type: String,
    enum: ['manage_users', 'manage_classes', 'manage_schedules', 'view_reports', 'manage_settings']
  }],
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
adminSchema.index({ email: 1, username: 1, role: 1, status: 1 });

module.exports = mongoose.model('Admin', adminSchema);
