const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const indexPath = path.join(dir, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Update Title and Meta Description
content = content.replace(
  /<title>.*?<\/title>/,
  '<title>খাঁটি গরুর দুধ হোম ডেলিভারি মিরপুর ১২ | Dairy Pure & Organic</title>'
);

content = content.replace(
  /<meta name="title" content=".*?">/,
  '<meta name="title" content="খাঁটি গরুর দুধ হোম ডেলিভারি মিরপুর ১২ | Dairy Pure & Organic">'
);

content = content.replace(
  /<meta name="description" content=".*?">/,
  '<meta name="description" content="মিরপুর ১২ ও পল্লবীতে সরাসরি খামার থেকে খাঁটি ও তাজা গরুর দুধ হোম ডেলিভারি। ৫০০ml, ১ লিটার ও ৫ লিটার প্যাক। আজই অর্ডার করুন Dairy Pure & Organic থেকে।">'
);

content = content.replace(
  /<meta property="og:title" content=".*?">/,
  '<meta property="og:title" content="খাঁটি গরুর দুধ হোম ডেলিভারি মিরপুর ১২ | Dairy Pure & Organic">'
);

content = content.replace(
  /<meta property="og:description" content=".*?">/,
  '<meta property="og:description" content="মিরপুর ১২ ও পল্লবীতে সরাসরি খামার থেকে খাঁটি ও তাজা গরুর দুধ হোম ডেলিভারি। ৫০০ml, ১ লিটার ও ৫ লিটার প্যাক। আজই অর্ডার করুন Dairy Pure & Organic থেকে।">'
);

content = content.replace(
  /<meta name="twitter:title" content=".*?">/,
  '<meta name="twitter:title" content="খাঁটি গরুর দুধ হোম ডেলিভারি মিরপুর ১২ | Dairy Pure & Organic">'
);

content = content.replace(
  /<meta name="twitter:description" content=".*?">/,
  '<meta name="twitter:description" content="মিরপুর ১২ ও পল্লবীতে সরাসরি খামার থেকে খাঁটি ও তাজা গরুর দুধ হোম ডেলিভারি। ৫০০ml, ১ লিটার ও ৫ লিটার প্যাক। আজই অর্ডার করুন Dairy Pure & Organic থেকে।">'
);

// 2. Comprehensive 10 FAQ items for Schema & Body
const faqs = [
  {
    q: 'মিরপুর ১২-এ কোথায় খাঁটি গরুর দুধ পাওয়া যায়?',
    a: 'Dairy Pure & Organic সরাসরি নিজস্ব খামার থেকে কোনো প্রকার ভেজাল বা কেমিক্যাল ছাড়া খাঁটি কাঁচা গরুর দুধ সরবরাহ করে। মিরপুর ১২-এর হাউজ ১৮, রোড ৪, ব্লক সি-তে অবস্থিত অফিসিয়াল হাব থেকে সরাসরি সংগ্রহ অথবা হোম ডেলিভারি নেওয়া যায়।'
  },
  {
    q: 'মিরপুর ১২-এ গরুর দুধ হোম ডেলিভারি করে কে?',
    a: 'Dairy Pure & Organic মিরপুর ১২, পল্লবী এবং এর সংলগ্ন এলাকায় সার্বক্ষণিক ২৪/৭ দিন-রাত নির্ভরযোগ্য খাঁটি গরুর দুধের হোম ডেলিভারি সেবা প্রদান করে।'
  },
  {
    q: 'Dairy Pure & Organic কোন এলাকায় দুধ ডেলিভারি করে?',
    a: 'প্রধানত মিরপুর ১২, পল্লবী, মিরপুর ১১, মিরপুর ১০, মিরপুর ডিওএইচএস এবং বৃহত্তর মিরপুর ও ঢাকা শহরে ডেলিভারি প্রদান করে।'
  },
  {
    q: '৫০০ml গরুর দুধের দাম কত?',
    a: '৫০০ মি.লি. খাঁটি কাঁচা তরল দুধের পাউচ প্যাকেটের নিয়মিত দাম মাত্র ৳৫০।'
  },
  {
    q: '১ লিটার গরুর দুধের দাম কত?',
    a: '১ লিটার বোতলজাত খাঁটি কাঁচা তরল দুধের রেগুলার মূল্য ৳১০০। DPO গোল্ড মেম্বারদের জন্য বিশেষ মূল্য ৳৯৫।'
  },
  {
    q: '৫ লিটার গরুর দুধের দাম কত?',
    a: '৫ লিটার ফ্যামিলি প্যাকের নিয়মিত মূল্য ৳৪৭৫ থেকে ৳৫০০ এবং মেম্বারদের জন্য বিশেষ মূল্য মাত্র ৳৪৫০।'
  },
  {
    q: 'কীভাবে দুধ অর্ডার করব?',
    a: 'অনলাইন শপ (www.dairypureorganic.com/shop) ভিজিট করে সরাসরি কার্টে যুক্ত করে চেকআউট করুন, অথবা ফোন (+880 1712-281861, +880 1734580407) ও হোয়াটসঅ্যাপ (+880 1775 002 340)-এ যোগাযোগ করে অর্ডার করুন।'
  },
  {
    q: 'মিরপুর ১২-এ কি প্রতিদিন দুধ ডেলিভারি হয়?',
    a: 'হ্যাঁ, মিরপুর ১২ ও পল্লবীতে প্রতিদিন সকাল, বিকালসহ সার্বক্ষণিক ২৪/৭ যেকোনো সময়ে নিয়মিত তাজা দুধ হোম ডেলিভারি দেওয়া হয়।'
  },
  {
    q: 'Dairy Pure & Organic-এর দুধ কোথা থেকে সংগ্রহ করা হয়?',
    a: 'আমাদের সম্পূর্ণ নিজস্ব প্রাকৃতিক খামারে স্বাস্থ্যসম্মত খাদ্য ও ঘাস খাইয়ে লালিত গাভী থেকে স্পর্শহীন আধুনিক স্বয়ংক্রিয় প্রক্রিয়ায় দুধ সংগ্রহ করা হয়।'
  },
  {
    q: 'দুধ কীভাবে সংরক্ষণ করা হয়?',
    a: 'দুধ দোহনের পর ৪ ডিগ্রি সেলসিয়াস নিয়ন্ত্রিত কোল্ড-চেইনে স্বাস্থ্যসম্মত ফুড-গ্রেড বোতল ও প্যাকেটে সংরক্ষণ করে গ্রাহকের কাছে পৌঁছে দেওয়া হয়।'
  }
];

// Visible FAQ HTML
const visibleFaqHtml = faqs.map(f => `
                <div class="faq-item" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px;">
                    <h3 style="font-size: 17px; color: var(--dpo-blue-dark); margin-bottom: 8px; display: flex; align-items: center; gap: 10px;">
                        <i class="fa-solid fa-circle-question" style="color: var(--dpo-blue);"></i> ${f.q}
                    </h3>
                    <p style="font-size: 14.5px; color: var(--text-muted); line-height: 1.6; margin: 0;">
                        ${f.a}
                    </p>
                </div>`).join('\n');

const visibleFaqSectionRegex = /<div style="max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; gap: 14px;">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;

content = content.replace(
  visibleFaqSectionRegex,
  `<div style="max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; gap: 14px;">${visibleFaqHtml}
            </div>
        </div>
    </section>`
);

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Successfully updated index.html!');
