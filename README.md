# School Management System

A comprehensive school management system with separate frontend and backend architecture, powered by MongoDB for data persistence.

## 🚀 Features

- **Frontend**: React-based user interface with theme customization
- **Backend**: Node.js server with MongoDB database
- **Data Management**: Student, teacher, and parent account management
- **Real-time Updates**: WebSocket communication for live updates
- **Theme System**: Customizable admin themes and user preferences
- **Database**: MongoDB with Mongoose ODM for robust data storage

## 🏗️ Project Structure

```
school-management/
├── frontend/          # React frontend application
│   ├── src/          # React source code
│   ├── public/       # Public assets
│   ├── package.json  # Frontend dependencies
│   └── ...          # Frontend config files
├── backend/          # Node.js backend server
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── config/       # Database configuration
│   ├── server/       # Server code
│   ├── scripts/      # Utility scripts
│   └── package.json  # Backend dependencies
├── package.json      # Root package.json for managing both
├── README.md         # This file
├── MONGODB_SETUP.md  # MongoDB setup guide
└── start.sh          # Easy startup script
```

## 🗄️ Database

This project uses **MongoDB** as the primary database instead of localStorage:

- **MongoDB**: NoSQL database for scalable data storage
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB
- **Collections**: Students, Teachers, Admins, Parents, Receptionists, Managers, Contact Submissions
- **Migration**: Automated data migration from localStorage to MongoDB

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Community Edition
- Git

### 1. Install MongoDB
Follow the detailed guide in [MONGODB_SETUP.md](./MONGODB_SETUP.md)

### 2. Install all dependencies
```bash
npm run install-all
```

### 3. Set up environment variables
```bash
cd backend
cp env.example .env
# Edit .env with your MongoDB configuration
```

### 4. Run database migration
```bash
npm run migrate
```

### 5. Start development mode (both frontend and backend)
```bash
npm run dev
```

### 6. Or use the startup script
```bash
./start.sh
```

## 📡 API Endpoints

The backend provides RESTful API endpoints:

- **Health Check**: `GET /api/health`
- **Authentication**: `POST /api/auth/login`
- **Students**: `GET/POST/PUT/DELETE /api/students`
- **Teachers**: `GET/POST/PUT/DELETE /api/teachers`
- **Contact**: `GET/POST/PUT/DELETE /api/contact`

## 🛠️ Available Scripts

### Root Level
```bash
npm run install-all    # Install dependencies for both projects
npm run dev            # Run both frontend and backend in development
npm run start          # Run both in production mode
npm run migrate        # Run database migration
npm run db:setup       # Set up database with sample data
npm run db:reset       # Reset database and re-migrate
```

### Frontend
```bash
cd frontend
npm start          # Start React dev server
npm run build      # Build for production
npm test           # Run tests
```

### Backend
```bash
cd backend
npm start          # Start production server
npm run dev        # Start with nodemon (development)
npm run migrate    # Run database migration
```

## 🌐 Ports

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5001
- **MongoDB**: mongodb://localhost:27017

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/school_management
PORT=5001
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
CORS_ORIGIN=http://localhost:3000
```

### Database Models
- **Student**: Personal info, class, parent details
- **Teacher**: Credentials, department, subject
- **Admin**: Role-based access control
- **Parent**: Child relationships, contact info
- **Receptionist**: Front desk operations
- **Manager**: Department management

## 📊 Data Migration

The system includes automated migration from localStorage to MongoDB:

1. **Sample Data**: Pre-loaded with test accounts
2. **Migration Script**: `npm run migrate`
3. **Data Validation**: Schema validation and error handling
4. **Backup**: Original data preserved during migration

## 🔑 Default Login Credentials

After running the migration, these accounts are available:

- **Admin**: username: `Alex`, password: `123456`
- **Teacher**: username: `aaaaa`, password: `anil`
- **Receptionist**: username: `receptionist`, password: `receptionist123`
- **Manager**: username: `manager`, password: `manager123`

## 🚨 Important Notes

- **MongoDB Required**: The system now requires MongoDB to be running
- **Data Persistence**: All data is now stored in MongoDB, not browser localStorage
- **API First**: Frontend communicates with backend via REST API
- **Scalability**: MongoDB provides better scalability than localStorage

## 🆘 Troubleshooting

### Common Issues
1. **MongoDB not running**: Start MongoDB service
2. **Port conflicts**: Check if ports 3000/5001 are available
3. **Connection errors**: Verify MongoDB URI in `.env` file
4. **Migration failures**: Check MongoDB logs and connection

### Getting Help
- Check [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed setup
- Verify MongoDB service is running
- Check environment variables are set correctly
- Review backend logs for error messages

## 🔮 Future Enhancements

- JWT authentication implementation
- Real-time WebSocket updates
- File upload capabilities
- Advanced reporting and analytics
- Multi-tenant support
- API rate limiting and security

## 📚 Documentation

- [MongoDB Setup Guide](./MONGODB_SETUP.md)
- [API Documentation](./backend/README.md)
- [Frontend Components](./frontend/README.md)

---

**Note**: This system has been upgraded from localStorage to MongoDB for better data persistence, scalability, and production readiness.
