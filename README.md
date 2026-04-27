# ASP Cranes - Complete Fullstack Project

## 🏗️ Project Structure

```
asp-cranes-fullstack/
├── backend/          → Node.js + Express + MongoDB API (Port 5000)
├── admin/            → Next.js 14 Admin CMS (Port 3001)
└── frontend/         → Next.js 14 Public Website (Port 3000)
```

## 🚀 Quick Setup

### Step 1: Prerequisites
- Node.js 18+ installed
- MongoDB running locally OR MongoDB Atlas URI
- Git

---

### Step 2: Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secrets
npm run seed    # Seeds database with sample data
npm run dev     # Starts on http://localhost:5000
```

**Default .env values (change in production):**
```env
MONGODB_URI=mongodb://localhost:27017/asp-cranes
JWT_SECRET=asp_cranes_super_secret_jwt_key_2024
PORT=5000
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

---

### Step 3: Admin CMS Setup

```bash
cd admin
npm install
cp .env.local.example .env.local
npm run dev     # Starts on http://localhost:3001
```

**Admin .env.local:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

**Default Login Credentials (set by seed script):**
- Super Admin: `superadmin@aspcranes.com` / `Admin@123`
- Admin: `admin@aspcranes.com` / `Admin@123`

---

### Step 4: Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev     # Starts on http://localhost:3000
```

**Frontend .env.local:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🔐 Authentication System

| Role | Access |
|------|--------|
| **superadmin** | Full access: all CRUD + manage admin users |
| **admin** | Manage all content (cranes, blogs, services, etc.) |

### Token System (JWT)
- **Access Token**: 15 minutes expiry
- **Refresh Token**: 7 days expiry
- Auto-refresh on 401 errors via Axios interceptor
- Stored in localStorage key: `asp-auth`

---

## 📡 API Endpoints

### Public Routes (no auth)
```
GET  /api/health
GET  /api/homepage
GET  /api/cranes              ?category=tower&search=...&page=1&limit=20
GET  /api/cranes/:slug
GET  /api/services
GET  /api/projects            ?category=...
GET  /api/blogs               ?search=...&category=...&tag=...&page=1
GET  /api/blogs/:slug
GET  /api/clients
GET  /api/faqs
GET  /api/about
GET  /api/settings
POST /api/contact             { name, email, phone, inquiry, message }
```

### Admin Routes (Bearer token required)
```
GET/PUT  /api/homepage
GET/PUT  /api/about
GET      /api/cranes/all
POST     /api/cranes
PUT      /api/cranes/:id
DELETE   /api/cranes/:id
GET      /api/services/all
POST     /api/services
PUT      /api/services/:id
DELETE   /api/services/:id
GET      /api/projects/all
POST     /api/projects
PUT      /api/projects/:id
DELETE   /api/projects/:id
GET      /api/blogs/all
POST     /api/blogs
PUT      /api/blogs/:id
DELETE   /api/blogs/:id
GET      /api/clients/all
POST     /api/clients
PUT      /api/clients/:id
DELETE   /api/clients/:id
GET      /api/faqs/all
POST     /api/faqs
PUT      /api/faqs/:id
DELETE   /api/faqs/:id
GET/PUT  /api/settings
GET      /api/contact
PUT      /api/contact/:id
DELETE   /api/contact/:id
POST     /api/upload/single
POST     /api/upload/multiple
POST     /api/auth/login
POST     /api/auth/logout
POST     /api/auth/refresh
GET      /api/auth/me
PUT      /api/auth/profile
PUT      /api/auth/change-password
POST     /api/auth/create-admin     (superadmin only)
GET      /api/auth/admins           (superadmin only)
```

---

## 🌐 Frontend Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage (Hero, About, Services, Projects, Blogs, FAQ, CTA) |
| `/about` | About Us page |
| `/our-cranes` | All cranes with category filter + search |
| `/our-cranes/:slug` | Single crane detail |
| `/services` | All services |
| `/projects` | Projects with category filter |
| `/blog` | Blog listing with search + filters (category, tag, author) |
| `/blog/:slug` | Single blog post |
| `/contact` | Contact form |

---

## 🎛️ Admin CMS Pages

| Route | Description |
|-------|-------------|
| `/login` | Admin login |
| `/admin/dashboard` | Stats overview |
| `/admin/homepage` | Edit hero slides, about section, FAQ header, etc. |
| `/admin/about` | Edit About page content |
| `/admin/cranes` | CRUD for crane fleet |
| `/admin/services` | CRUD for services |
| `/admin/projects` | CRUD for projects |
| `/admin/blogs` | CRUD for blog posts |
| `/admin/clients` | CRUD for client logos |
| `/admin/faqs` | CRUD for FAQs |
| `/admin/contacts` | View contact submissions |
| `/admin/settings` | Site settings, SEO, social links |

---

## 🔄 How CMS ↔ Website Sync Works

1. Admin saves content in CMS (e.g., edits a crane)
2. `api.put('/cranes/:id', data)` hits backend
3. Backend updates MongoDB
4. Frontend uses **ISR** (`export const revalidate = 60`)
5. Next.js re-fetches data every 60 seconds automatically
6. Changes appear on the public website within 60 seconds

---

## 📦 File Upload

Images are saved to `backend/uploads/images/`
Videos to `backend/uploads/videos/`

In production, configure FTP/Hostinger by:
1. Mounting Hostinger's FTP or using their API
2. Update `backend/routes/upload.js` with Hostinger FTP logic
3. Set `UPLOAD_PATH` in `.env`

---

## 🚀 Production Deployment

### Backend (e.g., Railway, Render, VPS)
```bash
npm start
```
Set environment variables in your hosting provider.

### Frontend & Admin (e.g., Vercel)
```bash
npm run build && npm start
```
Set `NEXT_PUBLIC_API_URL` to your live backend URL.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| Admin CMS | Next.js 14 (App Router), Tailwind CSS, Zustand |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (Access + Refresh tokens) |
| HTTP Client | Axios (with interceptors) |
| File Upload | Multer |
| Validation | express-validator |
