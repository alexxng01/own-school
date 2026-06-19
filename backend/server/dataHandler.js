const fs = require('fs');
const path = require('path');

// Data directory path
const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Write data to a file
 * @param {string} filename - Name of the file
 * @param {Array} data - Data to write
 */
const writeToFile = (filename, data) => {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const fileData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, fileData, 'utf8');
    console.log(`✅ Data written to ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error writing to ${filename}:`, error);
    return false;
  }
};

/**
 * Read data from a file
 * @param {string} filename - Name of the file
 * @returns {Array} Data from file
 */
const readFromFile = (filename) => {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileData);
    }
    return [];
  } catch (error) {
    console.error(`❌ Error reading from ${filename}:`, error);
    return [];
  }
};

/**
 * Export all data to files
 */
const exportAllData = () => {
  console.log('📁 Exporting data to files...');
  
  // Get data from localStorage (if running in browser context)
  let students = [];
  let teachers = [];
  
  // Try to read from localStorage if available
  if (typeof localStorage !== 'undefined') {
    const studentsData = localStorage.getItem('file_students.txt');
    const teachersData = localStorage.getItem('file_teachers.txt');
    
    if (studentsData) {
      students = JSON.parse(studentsData);
    }
    if (teachersData) {
      teachers = JSON.parse(teachersData);
    }
  }
  
  // If no data in localStorage, use sample data
  if (students.length === 0) {
    students = [
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
  }
  
  // Write data to files
  writeToFile('students.txt', students);
  writeToFile('teachers.txt', teachers);
  
  // Create a combined export file
  const exportData = {
    exportDate: new Date().toISOString(),
    students,
    teachers
  };
  
  writeToFile('export.json', exportData);
  
  console.log('✅ Data export completed!');
  console.log(`📊 Students: ${students.length}`);
  console.log(`👨‍🏫 Teachers: ${teachers.length}`);
  console.log(`📁 Files saved in: ${DATA_DIR}`);
};

/**
 * Show current data
 */
const showData = () => {
  console.log('📊 Current Data Summary:');
  
  const students = readFromFile('students.txt');
  const teachers = readFromFile('teachers.txt');
  
  console.log(`📚 Students: ${students.length}`);
  students.forEach(student => {
    console.log(`  - ${student.name} (${student.class}) - ${student.email}`);
  });
  
  console.log(`👨‍🏫 Teachers: ${teachers.length}`);
  teachers.forEach(teacher => {
    console.log(`  - ${teacher.name} (${teacher.subject}) - ${teacher.email}`);
  });
};

// Export functions
module.exports = {
  writeToFile,
  readFromFile,
  exportAllData,
  showData,
  DATA_DIR
};

// If run directly, export data
if (require.main === module) {
  exportAllData();
  showData();
} 