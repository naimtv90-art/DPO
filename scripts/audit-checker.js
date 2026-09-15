const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && !f.startsWith('google'));

console.log(`Auditing ${htmlFiles.length} HTML files...`);
let totalPassed = 0;
let totalChecked = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  
  const hasTitle = /<title>(.*?)<\/title>/.test(content);
  const hasDesc = /<meta name="description" content="(.*?)">/.test(content);
  const hasCanonical = /<link rel="canonical" href="(.*?)">/.test(content);
  const hasH1 = /<h1[\s>]/.test(content);
  const hasSchema = /application\/ld\+json/.test(content);

  // Check images for missing alt
  const imgTags = content.match(/<img [^>]*>/g) || [];
  const missingAlt = imgTags.filter(img => !img.includes('alt="'));

  console.log(`\n--- File: ${file} ---`);
  console.log(`  Title: ${hasTitle ? '✓' : '✗'}`);
  console.log(`  Description: ${hasDesc ? '✓' : '✗'}`);
  console.log(`  Canonical: ${hasCanonical ? '✓' : '✗'}`);
  console.log(`  H1 tag: ${hasH1 ? '✓' : '✗'}`);
  console.log(`  Schema JSON-LD: ${hasSchema ? '✓' : '✗'}`);
  console.log(`  Images total: ${imgTags.length}, Missing ALT: ${missingAlt.length}`);
});
