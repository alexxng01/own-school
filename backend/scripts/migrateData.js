const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('../config/database');
require('dotenv').config();

// Import models
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');
const Parent = require('../models/Parent');
const Receptionist = require('../models/Receptionist');
const Manager = require('../models/Manager');
const ContactSubmission = require('../models/ContactSubmission');

// Sample data for migration
const sampleData = {
  students: [
    {
      id: 1752973571438,
      name: "rahul",
      email: "rm91275@gmail.com",
      phone: "+9779819640",
      class: "a16",
      rollNumber: "12",
      parentName: "ram",
      parentPhone: "98198",
      address: " jambfa",
      status: "active"
    }
  ],
  teachers: [
    {
      id: 'TEA-2025-001',
      name: 'ANIL',
      username: 'aaaaa',
      email: 'anil@gmail.com',
      password: 'anil',
      department: 'general',
      subject: 'math',
      status: 'active'
    }
  ],
  admins: [
    {
      id: 'ADM-2025-001',
      name: 'Super Admin',
      username: 'Alex',
      email: 'admin@school.com',
      password:'1234567',
      role: 'super_admin',
      permissions: ['manage_users', 'manage_classes', 'manage_schedules', 'view_reports', 'manage_settings'],
      status: 'active'
    }
  ],
  receptionists: [
    {
      id: 'REC-2025-001',
      name: 'Receptionist',
      username: 'receptionist',
      email: 'receptionist@school.com',
      password: 'receptionist123',
      phone: '+1234567890',
      status: 'active'
    }
  ],
  managers: [
    {
      id: 'MGR-2025-001',
      name: 'Manager',
      username: 'manager',
      email: 'manager@school.com',
      password: 'manager123',
      department: 'general',
      status: 'active'
    }
  ]
};

const migrateData = async () => {
  try {
    console.log('🚀 Starting data migration to MongoDB...');
    
    // Connect to database
    await connectDB();
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Student.deleteMany({});
    await Teacher.deleteMany({});
    await Admin.deleteMany({});
    await Parent.deleteMany({});
    await Receptionist.deleteMany({});
    await Manager.deleteMany({});
    await ContactSubmission.deleteMany({});
    
    // Migrate students
    console.log('📚 Migrating students...');
    if (sampleData.students.length > 0) {
      const students = await Student.insertMany(sampleData.students);
      console.log(`✅ Migrated ${students.length} students`);
    }
    
    // Migrate teachers
    console.log('👨‍🏫 Migrating teachers...');
    if (sampleData.teachers.length > 0) {
      const teachers = await Teacher.insertMany(sampleData.teachers);
      console.log(`✅ Migrated ${teachers.length} teachers`);
    }
    
    // Migrate admins
    console.log('👑 Migrating admins...');
    if (sampleData.admins.length > 0) {
      const admins = await Admin.insertMany(sampleData.admins);
      console.log(`✅ Migrated ${admins.length} admins`);
    }
    
    // Migrate receptionists
    console.log('📞 Migrating receptionists...');
    if (sampleData.receptionists.length > 0) {
      const receptionists = await Receptionist.insertMany(sampleData.receptionists);
      console.log(`✅ Migrated ${receptionists.length} receptionists`);
    }
    
    // Migrate managers
    console.log('👔 Migrating managers...');
    if (sampleData.managers.length > 0) {
      const managers = await Manager.insertMany(sampleData.managers);
      console.log(`✅ Migrated ${managers.length} managers`);
    }
    
    console.log('🎉 Data migration completed successfully!');
    
    // Show summary
    const studentCount = await Student.countDocuments();
    const teacherCount = await Teacher.countDocuments();
    const adminCount = await Admin.countDocuments();
    const receptionistCount = await Receptionist.countDocuments();
    const managerCount = await Manager.countDocuments();
    
    console.log('\n📊 Migration Summary:');
    console.log(`📚 Students: ${studentCount}`);
    console.log(`👨‍🏫 Teachers: ${teacherCount}`);
    console.log(`👑 Admins: ${adminCount}`);
    console.log(`📞 Receptionists: ${receptionistCount}`);
    console.log(`👔 Managers: ${managerCount}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await disconnectDB();
  }
};

// Run migration if called directly
if (require.main === module) {
  migrateData();
}

module.exports = { migrateData };
