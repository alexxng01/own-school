# School Management System - Data Files

This directory contains the exported data files from the School Management System.

## 📁 File Structure

- **`students.txt`** - Contains all student data in JSON format
- **`teachers.txt`** - Contains all teacher data in JSON format  
- **`export.json`** - Combined export with timestamp and all data

## 📊 Current Data

### Students
- **Total**: 1 student
- **Active**: 1 student
- **Sample Data**: Rahul (Class: a16, Email: rm91275@gmail.com)

### Teachers
- **Total**: 0 teachers
- **Status**: No teachers added yet

## 🔄 How to Export Data

### Method 1: Using the Web Interface
1. Log in as Admin or Reception
2. Go to the dashboard
3. Click the "Create Files" button
4. Files will be downloaded to your Downloads folder

### Method 2: Using Command Line
```bash
# Export sample data
node scripts/exportData.js

# Or use the data handler
node server/dataHandler.js
```

### Method 3: From Browser Console
```javascript
// In browser console, run:
createDataFiles();
```

## 📋 Data Format

### Student Data Structure
```json
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
```

### Teacher Data Structure
```json
{
  "id": 1234567890,
  "name": "Teacher Name",
  "email": "teacher@school.com",
  "phone": "+977123456789",
  "subject": "Mathematics",
  "department": "Science",
  "qualification": "MSc",
  "experience": "5 years",
  "address": "Teacher Address",
  "createdAt": "2025-07-20T01:00:00.000Z",
  "status": "active"
}
```

## 🔧 File Operations

The system supports the following file operations:
- ✅ **Read** - Load data from files
- ✅ **Write** - Save data to files
- ✅ **Append** - Add new records
- ✅ **Update** - Modify existing records
- ✅ **Delete** - Remove records
- ✅ **Search** - Find specific records

## 📝 Notes

- Files are created in JSON format for easy reading and processing
- All timestamps are in ISO format
- Data is automatically backed up when exported
- The system uses localStorage as a fallback when file system is not available

## 🚀 Next Steps

1. Add more students and teachers through the web interface
2. Export data regularly to maintain backups
3. Use the exported files for data analysis or migration 