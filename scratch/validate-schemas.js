const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

let errors = 0;
let count = 0;
for (const file of files) {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  const matches = content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  for (const match of matches) {
    count++;
    try {
      JSON.parse(match[1]);
    } catch(e) {
      console.error('Invalid JSON-LD in', file, e.message);
      errors++;
    }
  }
}
if (errors === 0) {
  console.log(`All ${count} JSON-LD schemas across all ${files.length} HTML files are 100% valid JSON!`);
} else {
  console.log(`Found ${errors} schema errors.`);
  process.exit(1);
}
