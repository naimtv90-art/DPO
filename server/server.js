const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from main website directory
const ROOT_DIR = path.join(__dirname, '..');
const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads');
const ADMIN_DIR = path.join(ROOT_DIR, 'admin');

// Ensure uploads folder exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Static Routes
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/admin', express.static(ADMIN_DIR));
app.use(express.static(ROOT_DIR));

// API Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Dairy Pure & Organic (DPO) API'
  });
});

// Admin Auth API
app.post('/api/admin/login', (req, res) => {
  const { identifier, password } = req.body;
  const validEmail = 'naimtv90@gmail.com';
  const validUsername = 'naimtv90';
  const validPassword = '#naim#0191';

  const isUserMatch = identifier && (
    identifier.trim().toLowerCase() === validEmail.toLowerCase() ||
    identifier.trim().toLowerCase() === validUsername.toLowerCase()
  );

  if (isUserMatch && password === validPassword) {
    return res.json({
      success: true,
      message: 'লগইন সফল হয়েছে',
      user: {
        name: 'Naim (Admin)',
        email: validEmail,
        username: validUsername,
        role: 'Super Admin'
      },
      token: 'dpo_sec_' + Buffer.from(Date.now() + ':' + validEmail).toString('base64')
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'ভুল ইমেইল/ইউজারনেম অথবা পাসওয়ার্ড! দয়া করে সঠিক তথ্য দিন।'
    });
  }
});

// Admin fallback (serve admin/index.html for /admin routes)
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(ADMIN_DIR, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 DPO Website & Backend Server is running!`);
  console.log(`🌐 Website URL:   http://localhost:${PORT}`);
  console.log(`🛡️  Admin CMS:    http://localhost:${PORT}/admin`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
  console.log('====================================================');
});
