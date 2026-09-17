// Vercel Serverless Function for /api/admin/login
module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { identifier, password } = req.body || {};
  const validEmail = 'naimtv90@gmail.com';
  const validUsername = 'naimtv90';
  const validPassword = '#naim#0191';

  const isUserMatch = identifier && (
    identifier.trim().toLowerCase() === validEmail.toLowerCase() ||
    identifier.trim().toLowerCase() === validUsername.toLowerCase()
  );

  if (isUserMatch && password === validPassword) {
    return res.status(200).json({
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
};
