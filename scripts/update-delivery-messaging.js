const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Update data/locations.json
const locationsPath = path.join(rootDir, 'data', 'locations.json');
const locationsData = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));

locationsData.business.deliveryTime = "২৪/৭ সার্বক্ষণিক হোম ডেলিভারি";

locationsData.locations.forEach(loc => {
  if (loc.hero && loc.hero.description) {
    loc.hero.description = loc.hero.description.replace(/প্রতিদিন সকালে ও বিকালে/g, '২৪/৭ দিন-রাত যেকোনো সময়ে');
  }
  if (loc.ogDescription) {
    loc.ogDescription = loc.ogDescription.replace(/প্রতিদিন সকালে ও বিকালে/g, '২৪/৭ দিন-রাত যেকোনো সময়ে');
  }

  // Update localPointers if they mention shift/morning/evening
  if (loc.localIntro && loc.localIntro.localPointers) {
    loc.localIntro.localPointers = loc.localIntro.localPointers.map(ptr => {
      if (ptr.includes('শিফটে') || ptr.includes('সুনির্দিষ্ট সময়ে') || ptr.includes('সকাল ও বিকাল')) {
        return "২৪/৭ দিন-রাত যেকোনো সময়ে সার্বক্ষণিক তাজা দুধ হোম ডেলিভারির সুবিধা";
      }
      return ptr;
    });
  }

  // Update FAQs
  if (loc.faqs) {
    loc.faqs.forEach(faq => {
      if (faq.q.includes('সময়ে') || faq.q.includes('কখন') || faq.q.includes('কতক্ষণ') || faq.q.includes('শিডিউল')) {
        faq.a = `${loc.nameBn} এলাকায় আমাদের রয়েছে ডেলিভারি: ২৪/৭ সার্বক্ষণিক হোম ডেলিভারি সুবিধা। গ্রাহকের সুবিধার্থে দিন-রাত যেকোনো সময়ে সরাসরি বাসার ঠিকানায় তাজা ও খাঁটি দুধ পৌঁছে দেওয়া হয়।`;
      }
    });
  }
});

fs.writeFileSync(locationsPath, JSON.stringify(locationsData, null, 2), 'utf8');
console.log('✓ Updated data/locations.json');

// 2. Update scripts/generate-locations.js
let genScript = fs.readFileSync(path.join(rootDir, 'scripts', 'generate-locations.js'), 'utf8');

// Replace top-bar announcement in generator
genScript = genScript.replace(
  /<span><i class="fa-solid fa-bullhorn"><\/i> 🚚 \$\{loc\.nameBn\}-এ ২৪\/৭ দিন-রাত যেকোনো সময়ে সরাসরি নিজস্ব খামার থেকে খাঁটি দুধ হোম ডেলিভারি!<\/span>/g,
  `<span><i class="fa-solid fa-bullhorn"></i> 🚚 \${loc.nameBn}-এ ডেলিভারি: ২৪/৭ সার্বক্ষণিক হোম ডেলিভারি — দিন-রাত যেকোনো সময় সরাসরি খামারের খাঁটি দুধ!</span>`
);

// Replace why choose desc
genScript = genScript.replace(
  /সকাল ও বিকাল উভয় সময়ে নিজস্ব ফার্মের গাভী থেকে টাটকা দুধ সংগ্রহ করে দ্রুততম সময়ে সরবরাহ করা হয়।/g,
  `দিন-রাত ২৪/৭ সার্বক্ষণিক নিজস্ব ফার্মের গাভী থেকে টাটকা দুধ সংগ্রহ করে আপনার সুবিধাজনক সময়ে সরবরাহ করা হয়।`
);

// Replace how delivery works subtitle
genScript = genScript.replace(
  /ঝামেলামুক্ত উপায়ে প্রতিদিন সকালে বা বিকালে আপনার বাসায় তাজা দুধ পৌঁছে যাবে।/g,
  `ঝামেলামুক্ত উপায়ে ২৪/৭ দিন-রাত যেকোনো সময়ে আপনার বাসায় তাজা দুধ পৌঁছে যাবে।`
);

// Replace route step
genScript = genScript.replace(
  /<span>সকাল ও বিকাল তাজা দুধ সংগ্রহ<\/span>/g,
  `<span>২৪/৭ তাজা দুধ সংগ্রহ ও সরবরাহ</span>`
);

// Replace footer clock line
genScript = genScript.replace(
  /<div><i class="fa-solid fa-clock" style="color: var\(--dpo-sun\); margin-right: 8px;"><\/i> ডেলিভারি: \$\{business\.deliveryTime\}<\/div>/g,
  `<div><i class="fa-solid fa-clock" style="color: var(--dpo-sun); margin-right: 8px;"></i> ডেলিভারি: ২৪/৭ সার্বক্ষণিক হোম ডেলিভারি</div>`
);

fs.writeFileSync(path.join(rootDir, 'scripts', 'generate-locations.js'), genScript, 'utf8');
console.log('✓ Updated scripts/generate-locations.js');

// 3. Update all standalone HTML pages
const htmlFiles = [
  'index.html',
  'shop.html',
  'about.html',
  'contact.html',
  'membership.html',
  'checkout.html',
  'khati-gorur-dudh.html',
  'gorur-dudh-home-delivery.html',
  'milk-price.html',
  'pure-milk-benefits.html',
  'mirpur-12-milk-delivery.html',
  'pure-cow-milk-mirpur.html',
  'cow-milk-home-delivery-pallabi.html'
];

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace footer clock line
  content = content.replace(
    /<div><i class="fa-solid fa-clock" style="color: var\(--dpo-sun\); margin-right: 8px;"><\/i> সেবা: ২৪\/৭ সার্বক্ষণিক অর্ডার গ্রহণ ও হোম ডেলিভারি<\/div>/g,
    `<div><i class="fa-solid fa-clock" style="color: var(--dpo-sun); margin-right: 8px;"></i> ডেলিভারি: ২৪/৭ সার্বক্ষণিক হোম ডেলিভারি</div>`
  );
  content = content.replace(
    /<p><i class="fa-solid fa-clock"><\/i> সেবা: ২৪\/৭ সার্বক্ষণিক অর্ডার গ্রহণ ও হোম ডেলিভারি<\/p>/g,
    `<p><i class="fa-solid fa-clock"></i> ডেলিভারি: ২৪/৭ সার্বক্ষণিক হোম ডেলিভারি</p>`
  );
  content = content.replace(
    /<div><i class="fa-solid fa-clock" style="color: var\(--dpo-sun\); margin-right: 8px;"><\/i> ডেলিভারি: ২৪\/৭ সার্বক্ষণিক হোম ডেলিভারি \(সকাল ও বিকাল তাজা দোয়ানো\)<\/div>/g,
    `<div><i class="fa-solid fa-clock" style="color: var(--dpo-sun); margin-right: 8px;"></i> ডেলিভারি: ২৪/৭ সার্বক্ষণিক হোম ডেলিভারি</div>`
  );

  // Replace top-bar announcement if present
  content = content.replace(
    /<span><i class="fa-solid fa-bullhorn"><\/i> 🚚 ২৪\/৭ সার্বক্ষণিক অর্ডার গ্রহণ — প্রতিদিন সরাসরি খামার থেকে খাঁটি দুধের হোম ডেলিভারি!<\/span>/g,
    `<span><i class="fa-solid fa-bullhorn"></i> 🚚 ডেলিভারি: ২৪/৭ সার্বক্ষণিক হোম ডেলিভারি — দিন-রাত যেকোনো সময়ে সরাসরি খামার থেকে খাঁটি দুধ!</span>`
  );

  // In contact.html:
  content = content.replace(
    /<p>২৪\/৭ সার্বক্ষণিক অর্ডার গ্রহণ<br>\(প্রতিদিন নিয়মিত তাজা দুধ ডেলিভারি\)<\/p>/g,
    `<p><strong>২৪/৭ সার্বক্ষণিক হোম ডেলিভারি</strong><br>দিন-রাত যেকোনো সময় তাজা দুধ সরবরাহ</p>`
  );

  // In index.html feature info:
  content = content.replace(
    /<h4>২৪\/৭ সার্বক্ষণিক অর্ডার<\/h4>\s*<p>দিন-রাত যেকোনো সময়ে অর্ডার গ্রহণ এবং প্রতিদিন সময়মতো তাজা দুধ হোম ডেলিভারি।<\/p>/g,
    `<h4>২৪/৭ সার্বক্ষণিক হোম ডেলিভারি</h4>\n                        <p>দিন-রাত যেকোনো সময়ে অর্ডার ও ডেলিভারি: ২৪/৭ সার্বক্ষণিক হোম ডেলিভারি সেবা।</p>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Updated ${file}`);
});
