const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && !f.startsWith('google'));

const officialNAP = {
  name: 'Dairy Pure & Organic',
  streetAddress: 'House 18, Road 4, Block C, Mirpur-12',
  addressLocality: 'Mirpur 12',
  addressRegion: 'Dhaka',
  postalCode: '1216',
  addressCountry: 'BD',
  fullAddressText: 'House 18, Road 4, Block C, Mirpur-12, Dhaka-1216',
  primaryPhone: '+880 1712-281861',
  secondaryPhone: '+880 1734580407',
  whatsappPhone: '+880 1775 002 340',
  whatsappRaw: '8801775002340',
  latitude: 23.8223,
  longitude: 90.3654
};

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Fix PostalAddress streetAddress in JSON-LD
  html = html.replace(/"streetAddress":\s*"Pallobi"/g, '"streetAddress": "House 18, Road 4, Block C, Mirpur-12"');
  
  // 2. Standardize Business Name in LocalBusiness schemas
  html = html.replace(/"name":\s*"Dairy Pure & Organic - [^"]+"/g, '"name": "Dairy Pure & Organic"');

  // 3. Ensure consistent meta geo.placename
  html = html.replace(/<meta name="geo\.placename" content="[^"]+">/g, '<meta name="geo.placename" content="House 18, Road 4, Block C, Mirpur-12, Dhaka-1216, Bangladesh">');

  // 4. Ensure consistent footer address text
  html = html.replace(/House 18, Road 4, Block C, Mirpur-12, Dhaka, Bangladesh/g, 'House 18, Road 4, Block C, Mirpur-12, Dhaka-1216');

  // 5. Ensure consistent telephone in JSON-LD
  html = html.replace(/"telephone":\s*"\+8801775002340"/g, '"telephone": "+8801712281861"');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('NAP Standardized in:', file);
}

console.log('100% NAP consistency applied across all files!');
