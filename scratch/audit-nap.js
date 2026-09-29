const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

const audit = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  
  // Extract all occurrences of address-like strings
  const addressMatches = [];
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('House') || line.includes('Mirpur-12') || line.includes('Mirpur 12') || line.includes('Dhaka-1216') || line.includes('1216')) {
      if (!line.includes('<script src') && !line.includes('stylesheet')) {
        addressMatches.push({ line: idx + 1, text: line.trim() });
      }
    }
  });

  // Extract phone numbers
  const phoneMatches = [];
  lines.forEach((line, idx) => {
    if (line.includes('+880') || line.includes('01712') || line.includes('01734') || line.includes('01775')) {
      phoneMatches.push({ line: idx + 1, text: line.trim() });
    }
  });

  // Extract business names
  const nameMatches = [];
  lines.forEach((line, idx) => {
    if (line.includes('Dairy Pure') || line.includes('DPO')) {
      if (line.includes('<title>') || line.includes('og:title') || line.includes('schema') || line.includes('footer-logo')) {
        nameMatches.push({ line: idx + 1, text: line.trim() });
      }
    }
  });

  audit.push({
    file,
    addressMatches,
    phoneMatches,
    nameMatches
  });
}

fs.writeFileSync(path.join(rootDir, 'scratch', 'nap-report.json'), JSON.stringify(audit, null, 2), 'utf8');
console.log('NAP audit report generated.');
