const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && !f.startsWith('google'));

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace feature cards and banners
  content = content.replace(/<p>সকাল ও বিকাল তাজা দুধ পৌঁছে যাবে<\/p>/g, '<p>সার্বক্ষণিক তাজা দুধ পৌঁছে যাবে</p>');
  content = content.replace(/<p>সকাল ও বিকাল নির্দিষ্ট সময়ে আপনার দরজায়<\/p>/g, '<p>সার্বক্ষণিক নির্দিষ্ট সময়ে আপনার দরজায়</p>');
  content = content.replace(/প্রতিদিন সকাল ও বিকালের তাজা দোয়ানো খাঁটি কাঁচা তরল গরুর দুধ/g, 'খামারের প্রতিদিনের তাজা দোয়ানো খাঁটি কাঁচা তরল গরুর দুধ');
  content = content.replace(/প্রতিদিন সকাল ও বিকাল নিয়মিত তাজা দুধ হোম ডেলিভারি দেওয়া হয়/g, 'সার্বক্ষণিক ২৪/৭ যেকোনো সময়ে তাজা দুধ হোম ডেলিভারি দেওয়া হয়');
  content = content.replace(/প্রতিদিন সকাল, বিকালসহ সার্বক্ষণিক ২৪\/৭ যেকোনো সময়ে নিয়মিত তাজা দুধ হোম ডেলিভারি দেওয়া হয়/g, 'সার্বক্ষণিক ২৪/৭ দিন-রাত যেকোনো সময়ে সরাসরি খাঁটি তাজা দুধ হোম ডেলিভারি দেওয়া হয়');
  content = content.replace(/প্রতিদিন সকাল-বিকালে গ্রাহকের দোরগোড়ায় পৌঁছে দেওয়ার ইনচার্জ/g, 'প্রতিদিন গ্রাহকের দোরগোড়ায় সার্বক্ষণিক দুধ পৌঁছে দেওয়ার ইনচার্জ');
  content = content.replace(/প্রতিদিন সকালে প্রায়োরিটি হোম ডেলিভারি/g, 'গ্রাহকের সুবিধাজনক সময়ে প্রায়োরিটি হোম ডেলিভারি');
  content = content.replace(/প্রতিদিন সকালে কীভাবে তাজা দুধ ডেলিভারি করা হয়/g, 'কীভাবে সার্বক্ষণিক তাজা দুধ ডেলিভারি করা হয়');
  content = content.replace(/নিয়মিত সকালে কাঁচা তরল গরুর দুধ সরবরাহ করে আসছি/g, 'নিয়মিত সার্বক্ষণিক কাঁচা তরল গরুর দুধ সরবরাহ করে আসছি');
  content = content.replace(/মেম্বারদের জন্য প্রতিদিন সকাল ৬টা থেকে ৮টার মধ্যে নিশ্চিত হোম ডেলিভারি সার্ভিস/g, 'মেম্বারদের জন্য প্রতিদিন সুবিধাজনক সময়ে নিশ্চিত ও প্রায়োরিটি হোম ডেলিভারি সার্ভিস');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Cleaned "sokal bikal" in:', file);
}

// Also update main.js if present
const jsPath = path.join(rootDir, 'assets', 'js', 'main.js');
if (fs.existsSync(jsPath)) {
  let js = fs.readFileSync(jsPath, 'utf8');
  js = js.replace(/প্রতিদিন সকাল ও বিকালের তাজা দোয়ানো খাঁটি কাঁচা তরল গরুর দুধ/g, 'খামারের প্রতিদিনের তাজা দোয়ানো খাঁটি কাঁচা তরল গরুর দুধ');
  fs.writeFileSync(jsPath, js, 'utf8');
  console.log('Updated main.js');
}

console.log('All morning/afternoon mentions replaced with clean 24/7 / anytime delivery messaging!');
