#!/bin/bash
# ASP Cranes - Start All Services
# Usage: bash start-all.sh

set -e

echo "╔══════════════════════════════════════════╗"
echo "║      ASP CRANES - FULLSTACK STARTUP      ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# Check if MongoDB is running
if ! pgrep -x mongod > /dev/null 2>&1; then
  echo "⚠️  MongoDB not running. Starting..."
  mongod --fork --logpath /tmp/mongod.log 2>/dev/null || echo "   Manual start: run 'mongod' in a separate terminal"
fi

# Backend
echo "🔧 Starting Backend (Port 5000)..."
cd backend
[ ! -f .env ] && cp .env.example .env && echo "   Created backend/.env from example"
npm install --silent
node utils/seed.js 2>/dev/null || true  # Seed if DB is empty (ignore if already seeded)
npm run dev &
BACKEND_PID=$!
echo "   ✅ Backend started (PID: $BACKEND_PID)"
cd ..

sleep 2

# Admin
echo "🎛️  Starting Admin CMS (Port 3001)..."
cd admin
[ ! -f .env.local ] && cp .env.local.example .env.local && echo "   Created admin/.env.local from example"
npm install --silent
npm run dev &
ADMIN_PID=$!
echo "   ✅ Admin CMS started (PID: $ADMIN_PID)"
cd ..

sleep 2

# Frontend
echo "🌐 Starting Frontend (Port 3000)..."
cd frontend
[ ! -f .env.local ] && echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local && echo "   Created frontend/.env.local"
npm install --silent
npm run dev &
FRONTEND_PID=$!
echo "   ✅ Frontend started (PID: $FRONTEND_PID)"
cd ..

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║            ALL SERVICES RUNNING          ║"
echo "╠══════════════════════════════════════════╣"
echo "║  🌐 Website:  http://localhost:3000      ║"
echo "║  🎛️  Admin:    http://localhost:3001      ║"
echo "║  📡 API:      http://localhost:5000/api  ║"
echo "╠══════════════════════════════════════════╣"
echo "║  👤 Login:  superadmin@aspcranes.com     ║"
echo "║  🔑 Pass:   Admin@123                    ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait and clean up
trap "kill $BACKEND_PID $ADMIN_PID $FRONTEND_PID 2>/dev/null; echo 'All services stopped.'; exit" INT TERM
wait
