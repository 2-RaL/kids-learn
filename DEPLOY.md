# Kids Move & Learn — Hostinger Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Build the Frontend
```bash
npm install
npm run build
```

### 2. Create ZIP for Upload
Create a ZIP containing these files/folders:
```
server/          (index.js, db.js, auth.js, routes/)
dist/            (built frontend files)
public/          (static assets)
package.json
package-lock.json
```

**Do NOT include:** `node_modules/`, `src/`, `.git/`, `android/`, `*.apk`, `*.zip`

### 3. Hostinger Configuration

**Framework:** Express  
**Entry File:** `server/index.js`  
**Node Version:** 22.x  

### 4. Environment Variables (Hostinger Dashboard)

Set these in your Hostinger Node.js Environment Variables section:

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | MySQL username | `u745491214_kidsdb` |
| `DB_PASSWORD` | MySQL password | `YourPassword123!` |
| `DB_NAME` | MySQL database name | `u745491214_kidslearn` |
| `JWT_SECRET` | Random secret key (32+ chars) | `a7x9k2m...` |
| `ADMIN_USERNAME` | Default admin username | `admin` |
| `ADMIN_PASSWORD` | Default admin password | `StrongPass123!` |
| `PORT` | Server port (Hostinger assigns) | `3000` |

### 5. Create MySQL Database

In Hostinger dashboard:
1. Go to **Databases → MySQL**
2. Create a new database
3. Note the database name, username, and password
4. Use these values in the environment variables above

### 6. Deploy

1. Upload the ZIP file
2. Set environment variables
3. Click **Deploy**
4. The server will automatically:
   - Connect to MySQL
   - Create the `users` table
   - Create the default admin user
   - Start serving the application

### 7. Verify

Visit: `https://yourdomain.com/api/health`

Expected response:
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-09-25T12:00:00.000Z"
}
```

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start frontend dev server (port 3000)
npm run dev

# Start backend server (port 3000) — needs MySQL + .env
npm run dev:server
```

## 📁 Project Structure

```
├── server/
│   ├── index.js          # Express server entry point
│   ├── db.js             # MySQL database layer
│   ├── auth.js           # JWT authentication middleware
│   └── routes/
│       ├── authRoutes.js  # Login & session endpoints
│       └── adminRoutes.js # User management endpoints
├── src/                   # React frontend source
├── dist/                  # Built frontend (after npm run build)
├── public/                # Static assets
├── package.json
├── .env.example           # Environment variables template
└── vite.config.ts         # Vite dev server config
```

## 🔐 Default Credentials

On first startup (if no admin exists):
- **Username:** value of `ADMIN_USERNAME` env var (default: `admin`)
- **Password:** value of `ADMIN_PASSWORD` env var (default: `admin123`)

⚠️ **Change the default admin password immediately after first login!**

## 🛠️ API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | No | Health check |
| POST | `/api/auth/login` | No | User login |
| GET | `/api/auth/me` | JWT | Get current user |
| GET | `/api/admin/users` | Admin | List all users |
| POST | `/api/admin/users` | Admin | Create user |
| PUT | `/api/admin/users/:id` | Admin | Update user |
| DELETE | `/api/admin/users/:id` | Admin | Delete user |
