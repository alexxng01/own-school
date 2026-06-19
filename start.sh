#!/bin/bash

echo "🚀 Starting School Management System..."

# Check if dependencies are installed
if [ ! -d "frontend/node_modules" ] || [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm run install-all
fi

echo "🔥 Starting development servers..."
npm run dev
