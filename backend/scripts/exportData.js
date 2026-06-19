#!/usr/bin/env node

/**
 * Data Export Script
 * Exports data from localStorage to actual files
 */

const fs = require('fs');
const path = require('path');

// Data directory path
const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Export sample data to files
 */
const exportSampleData = () => {
  console.log('📁 Exporting sample data to files...');
  
  const students = [
    {
      "id": 1752973571438,
      "name": "rahul",
      "email": "rm91275@gmail.com",
      "phone": "+9779819640",
      "class": "a16",
      "rollNumber": "12",
      "parentName": "ram",
      "parentPhone": "98198",
      "address": " jambfa",
      "createdAt": "2025-07-20T01:06:11.438Z",
      "status": "active"
    }
  ];
  
  const teachers = [];
  
  // Write individual files
  fs.writeFileSync(
    path.join(DATA_DIR, 'students.txt'), 
    JSON.stringify(students, null, 2), 
    'utf8'
  );
  
  fs.writeFileSync(
    path.join(DATA_DIR, 'teachers.txt'), 
    JSON.stringify(teachers, null, 2), 
    'utf8'
  );
  
  // Create combined export file
  const exportData = {
    exportDate: new Date().toISOString(),
    students,
    teachers
  };
  
  fs.writeFileSync(
    path.join(DATA_DIR, 'export.json'), 
    JSON.stringify(exportData, null, 2), 
    'utf8'
  );
  
  console.log('✅ Sample data exported successfully!');
  console.log(`📊 Students: ${students.length}`);
  console.log(`👨‍🏫 Teachers: ${teachers.length}`);
  console.log(`📁 Files saved in: ${DATA_DIR}`);
  console.log('\n📄 Files created:');
  console.log('  - students.txt');
  console.log('  - teachers.txt');
  console.log('  - export.json');
};

// Run the export
exportSampleData(); 