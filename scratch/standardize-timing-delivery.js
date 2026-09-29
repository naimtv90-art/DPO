const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && !f.startsWith('google'));

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Standardize Top Bar Announcement across all pages
  content = content.replace(
    /<span><i class="fa-solid fa-bullhorn"><\/i>.*?<\/span>/g,
    '<span><i class="fa-solid fa-bullhorn"></i> 🚚 ২৪/৭ সার্বক্ষণিক অর্ডার গ্রহণ — প্রতিদিন সরাসরি খামার থেকে খাঁটি দুধের হোম ডেলিভারি!</span>'
  );

  // 2. Standardize Top Bar / Footer Clock text
  content = content.replace(
    /ডেলিভারি:\s*২৪\/৭\s*\(?24\/7\)?\s*দিন-রাত\s*সার্বক্ষণিক/g,
    'সেবা: ২৪/৭ সার্বক্ষণিক অর্ডার গ্রহণ ও হোম ডেলিভারি'
  );
  content = content.replace(
    /ডেলিভারি:\s*২৪\/৭\s*\(দিন-রাত ২৪ ঘণ্টা সার্বক্ষণিক\)/g,
    'সেবা: ২৪/৭ সার্বক্ষণিক অর্ডার গ্রহণ ও হোম ডেলিভারি'
  );
  content = content.replace(
    /<p><i class="fa-solid fa-clock"><\/i> ডেলিভারি: ২৪\/৭<\/p>/g,
    '<p><i class="fa-solid fa-clock"></i> সেবা: ২৪/৭ সার্বক্ষণিক অর্ডার গ্রহণ ও হোম ডেলিভারি</p>'
  );

  // 3. Standardize contact card in contact.html & other pages
  content = content.replace(
    /<p>২৪\/৭ দিন-রাত যেকোনো সময়<br>\(সার্বক্ষণিক অর্ডার ও ডেলিভারি\)<\/p>/g,
    '<p>২৪/৭ সার্বক্ষণিক অর্ডার গ্রহণ<br>(প্রতিদিন নিয়মিত তাজা দুধ ডেলিভারি)</p>'
  );

  // 4. Standardize feature info cards
  content = content.replace(
    /<h4>২৪\/৭ ডেলিভারি সেবা<\/h4>\s*<p>দিন-রাত ২৪ ঘণ্টা যেকোনো সময়ে তাজা খাঁটি দুধের সার্বক্ষণিক সরবরাহ।<\/p>/g,
    '<h4>২৪/৭ সার্বক্ষণিক অর্ডার</h4>\n                        <p>দিন-রাত যেকোনো সময়ে অর্ডার গ্রহণ এবং প্রতিদিন সময়মতো তাজা দুধ হোম ডেলিভারি।</p>'
  );

  // 5. Harmonize FAQ questions & answers in DOM and Schema
  content = content.replace(
    /পল্লবী ও মিরপুর ১২ এবং এর আশপাশের এলাকায় প্রতিদিন সকাল ও বিকাল নিয়মিত তাজা দুধ হোম ডেলিভারি দেওয়া হয়।/g,
    'Dairy Pure & Organic ২৪/৭ সার্বক্ষণিক অর্ডার গ্রহণ করে এবং প্রতিদিন মিরপুর ১২ ও পল্লবীতে গ্রাহকের সুবিধাজনক সময়ে খাঁটি তাজা দুধ সরাসরি বাসায় পৌঁছে দেয়।'
  );

  content = content.replace(
    /আমরা ২৪\/৭ যেকোনো সময় অর্ডার গ্রহণ করি এবং দ্রুততম সময়ে আপনার ঠিকানায় দুধ পৌঁছে দিই।/g,
    'আমরা ২৪/৭ সার্বক্ষণিক অর্ডার গ্রহণ করি এবং প্রতিদিন নিয়মিত শিডিউলে আপনার ঠিকানায় তাজা দুধ পৌঁছে দিই।'
  );

  content = content.replace(
    /আমরা মিরপুর ১২-এর ব্লক এ, বি, সি, ডি, ই এবং আশপাশের প্রধান আবাসিক সোসাইটি ও পল্লবী সংলগ্ন রোডে ২৪\/৭ ডেলিভারি দিচ্ছি।/g,
    'আমরা মিরপুর ১২-এর ব্লক এ, বি, সি, ডি, ই এবং পল্লবী সংলগ্ন এলাকায় ২৪/৭ সার্বক্ষণিক অর্ডার গ্রহণ করে প্রতিদিন নিয়মিত তাজা দুধ সরবরাহ করছি।'
  );

  // 6. Fix meta tags descriptions mentioning conflicting 24/7 vs morning
  content = content.replace(
    /প্রতিদিন সকালে খামারের তাজা গরুর দুধ হোম ডেলিভারি দিচ্ছে/g,
    '২৪/৭ সার্বক্ষণিক অর্ডার গ্রহণ ও নিয়মিত খাঁটি গরুর দুধের হোম ডেলিভারি দিচ্ছে'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Timing messaging standardized in:', file);
}

console.log('Successfully standardized delivery & ordering timing across all 13 HTML files!');
