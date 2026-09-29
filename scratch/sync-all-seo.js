const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Update JSON-LD in index.html with all 10 FAQs and full Graph
const indexPath = path.join(rootDir, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

const fullSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "Store", "DairyFarm"],
      "@id": "https://www.dairypureorganic.com/#localbusiness",
      "name": "Dairy Pure & Organic",
      "alternateName": "ডেইরি পিওর অ্যান্ড অর্গানিক",
      "url": "https://www.dairypureorganic.com/",
      "logo": "https://www.dairypureorganic.com/assets/images/logo.png",
      "image": "https://www.dairypureorganic.com/assets/images/milk-1l.jpg",
      "description": "মিরপুর ১২, পল্লবী ও ঢাকায় সরাসরি নিজস্ব খামারের খাঁটি ও তাজা গরুর দুধের ২৪/৭ হোম ডেলিভারি সার্ভিস।",
      "telephone": "+8801712281861",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+8801712281861",
          "contactType": "customer service",
          "areaServed": "BD",
          "availableLanguage": ["bn", "en"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+8801734580407",
          "contactType": "sales",
          "areaServed": "BD",
          "availableLanguage": ["bn", "en"]
        }
      ],
      "priceRange": "৳50 - ৳500",
      "paymentAccepted": "Cash on Delivery, bKash, Nagad, Rocket",
      "currenciesAccepted": "BDT",
      "openingHours": "Mo-Su 00:00-24:00",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "House 18, Road 4, Block C, Mirpur-12",
        "addressLocality": "Mirpur 12",
        "addressRegion": "Dhaka",
        "postalCode": "1216",
        "addressCountry": "BD"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 23.8223,
        "longitude": 90.3654
      },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Mirpur 12" },
        { "@type": "AdministrativeArea", "name": "Pallabi" },
        { "@type": "AdministrativeArea", "name": "Mirpur 11" },
        { "@type": "AdministrativeArea", "name": "Mirpur 10" },
        { "@type": "AdministrativeArea", "name": "Mirpur DOHS" },
        { "@type": "City", "name": "Dhaka" }
      ],
      "sameAs": [
        "https://www.facebook.com/Dairypureorganic",
        "https://wa.me/8801775002340"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.dairypureorganic.com/#organization",
      "name": "Dairy Pure & Organic",
      "url": "https://www.dairypureorganic.com/",
      "logo": "https://www.dairypureorganic.com/assets/images/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+8801712281861",
        "contactType": "customer support"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.dairypureorganic.com/#website",
      "url": "https://www.dairypureorganic.com/",
      "name": "Dairy Pure & Organic",
      "inLanguage": "bn-BD"
    },
    {
      "@type": "ItemList",
      "@id": "https://www.dairypureorganic.com/#products",
      "itemListElement": [
        {
          "@type": "Product",
          "position": 1,
          "name": "খাঁটি কাঁচা তরল দুধ (১ লিটার)",
          "image": "https://www.dairypureorganic.com/assets/images/milk-1l.jpg",
          "description": "প্রতিদিন সকাল ও বিকালের তাজা দোয়ানো খাঁটি কাঁচা তরল গরুর দুধ।",
          "sku": "DPO-MILK-1L",
          "brand": { "@type": "Brand", "name": "Dairy Pure & Organic" },
          "offers": {
            "@type": "Offer",
            "price": "100",
            "priceCurrency": "BDT",
            "availability": "https://schema.org/InStock",
            "url": "https://www.dairypureorganic.com/shop"
          }
        },
        {
          "@type": "Product",
          "position": 2,
          "name": "খাঁটি কাঁচা তরল দুধ – RAW Milk (৫০০ মি.লি. প্যাকেট)",
          "image": "https://www.dairypureorganic.com/assets/images/milk-500ml.jpg",
          "description": "পূর্ণ ননীযুক্ত গাভীর খাঁটি কাঁচা তরল দুধ। ১০০% প্রাকৃতিক ও বিশুদ্ধ পাউচ প্যাকেট।",
          "sku": "DPO-MILK-500ML",
          "brand": { "@type": "Brand", "name": "Dairy Pure & Organic" },
          "offers": {
            "@type": "Offer",
            "price": "50",
            "priceCurrency": "BDT",
            "availability": "https://schema.org/InStock",
            "url": "https://www.dairypureorganic.com/shop"
          }
        },
        {
          "@type": "Product",
          "position": 3,
          "name": "খাঁটি কাঁচা তরল দুধ (৫ লিটার ফ্যামিলি প্যাক)",
          "image": "https://www.dairypureorganic.com/assets/images/milk-5l.jpg",
          "description": "পরিবারের জন্য সাশ্রয়ী ৫ লিটার তাজা তরল দুধের ফ্যামিলি প্যাক।",
          "sku": "DPO-MILK-5L",
          "brand": { "@type": "Brand", "name": "Dairy Pure & Organic" },
          "offers": {
            "@type": "Offer",
            "price": "475",
            "priceCurrency": "BDT",
            "availability": "https://schema.org/InStock",
            "url": "https://www.dairypureorganic.com/shop"
          }
        },
        {
          "@type": "Product",
          "position": 4,
          "name": "DPO গোল্ড মেম্বারশিপ কার্ড (আজীবন মেয়াদ)",
          "image": "https://www.dairypureorganic.com/assets/images/gold-card.jpg",
          "description": "আজীবন মেম্বারশিপ কার্ড। প্রতি লিটার দুধে ৫ টাকা স্থায়ী ছাড় ও প্রায়োরিটি হোম ডেলিভারি।",
          "sku": "DPO-MEMBERSHIP-GOLD",
          "brand": { "@type": "Brand", "name": "Dairy Pure & Organic" },
          "offers": {
            "@type": "Offer",
            "price": "50",
            "priceCurrency": "BDT",
            "availability": "https://schema.org/InStock",
            "url": "https://www.dairypureorganic.com/membership"
          }
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.dairypureorganic.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "মিরপুর ১২-এ কোথায় খাঁটি গরুর দুধ পাওয়া যায়?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dairy Pure & Organic সরাসরি নিজস্ব খামার থেকে কোনো প্রকার ভেজাল ছাড়া খাঁটি কাঁচা গরুর দুধ সরবরাহ করে। মিরপুর ১২-এর হাউজ ১৮, রোড ৪, ব্লক সি-তে অবস্থিত অফিসিয়াল হাব থেকে সংগ্রহ বা হোম ডেলিভারি নেওয়া যায়।"
          }
        },
        {
          "@type": "Question",
          "name": "মিরপুর ১২-এ গরুর দুধ হোম ডেলিভারি করে কে?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dairy Pure & Organic মিরপুর ১২, পল্লবী এবং এর সংলগ্ন এলাকায় সার্বক্ষণিক ২৪/৭ দিন-রাত নির্ভরযোগ্য খাঁটি গরুর দুধের হোম ডেলিভারি সেবা প্রদান করে।"
          }
        },
        {
          "@type": "Question",
          "name": "Dairy Pure & Organic কোন এলাকায় দুধ ডেলিভারি করে?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "প্রধানত মিরপুর ১২, পল্লবী, মিরপুর ১১, মিরপুর ১০, মিরপুর ডিওএইচএস এবং বৃহত্তর মিরপুর ও ঢাকা শহরে ডেলিভারি প্রদান করে।"
          }
        },
        {
          "@type": "Question",
          "name": "৫০০ml গরুর দুধের দাম কত?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "৫০০ মি.লি. খাঁটি কাঁচা তরল দুধের পাউচ প্যাকেটের নিয়মিত দাম মাত্র ৳৫০।"
          }
        },
        {
          "@type": "Question",
          "name": "১ লিটার গরুর দুধের দাম কত?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "১ লিটার বোতলজাত খাঁটি কাঁচা তরল দুধের রেগুলার মূল্য ৳১০০। DPO গোল্ড মেম্বারদের জন্য বিশেষ মূল্য ৳৯৫।"
          }
        },
        {
          "@type": "Question",
          "name": "৫ লিটার গরুর দুধের দাম কত?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "৫ লিটার ফ্যামিলি প্যাকের নিয়মিত মূল্য ৳৪৭৫ থেকে ৳৫০০ এবং মেম্বারদের জন্য বিশেষ মূল্য মাত্র ৳৪৫০।"
          }
        },
        {
          "@type": "Question",
          "name": "কীভাবে দুধ অর্ডার করব?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "অনলাইন শপ (www.dairypureorganic.com/shop) ভিজিট করে সরাসরি কার্টে যুক্ত করে চেকআউট করুন, অথবা ফোন (+880 1712-281861, +880 1734580407) ও হোয়াটসঅ্যাপ (+880 1775 002 340)-এ যোগাযোগ করে অর্ডার করুন।"
          }
        },
        {
          "@type": "Question",
          "name": "মিরপুর ১২-এ কি প্রতিদিন দুধ ডেলিভারি হয়?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "হ্যাঁ, মিরপুর ১২ ও পল্লবীতে প্রতিদিন সকাল, বিকালসহ সার্বক্ষণিক ২৪/৭ যেকোনো সময়ে নিয়মিত তাজা দুধ হোম ডেলিভারি দেওয়া হয়।"
          }
        },
        {
          "@type": "Question",
          "name": "Dairy Pure & Organic-এর দুধ কোথা থেকে সংগ্রহ করা হয়?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "আমাদের সম্পূর্ণ নিজস্ব প্রাকৃতিক খামারে স্বাস্থ্যসম্মত খাদ্য ও ঘাস খাইয়ে লালিত গাভী থেকে স্পর্শহীন আধুনিক স্বয়ংক্রিয় প্রক্রিয়ায় দুধ সংগ্রহ করা হয়।"
          }
        },
        {
          "@type": "Question",
          "name": "দুধ কীভাবে সংরক্ষণ করা হয়?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "দুধ দোহনের পর ৪ ডিগ্রি সেলসিয়াস নিয়ন্ত্রিত কোল্ড-চেইনে স্বাস্থ্যসম্মত ফুড-গ্রেড বোতল ও প্যাকেটে সংরক্ষণ করে গ্রাহকের কাছে পৌঁছে দেওয়া হয়।"
          }
        }
      ]
    }
  ]
};

indexContent = indexContent.replace(
  /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
  `<script type="application/ld+json">\n${JSON.stringify(fullSchemaGraph, null, 2)}\n    </script>`
);

fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log('Updated Schema Graph in index.html');

// 2. Update sitemap.xml
const sitemapPath = path.join(rootDir, 'sitemap.xml');
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://www.dairypureorganic.com/</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://www.dairypureorganic.com/assets/images/milk-1l.jpg</image:loc>
      <image:title>খাঁটি গরুর দুধ — Dairy Pure &amp; Organic</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://www.dairypureorganic.com/shop</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.dairypureorganic.com/membership</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://www.dairypureorganic.com/assets/images/gold-card.jpg</image:loc>
      <image:title>DPO গোল্ড মেম্বারশিপ কার্ড</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://www.dairypureorganic.com/mirpur-12-milk-delivery</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.dairypureorganic.com/cow-milk-home-delivery-pallabi</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.dairypureorganic.com/pure-cow-milk-mirpur</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.dairypureorganic.com/khati-gorur-dudh</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://www.dairypureorganic.com/gorur-dudh-home-delivery</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://www.dairypureorganic.com/milk-price</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://www.dairypureorganic.com/pure-milk-benefits</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://www.dairypureorganic.com/about</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.dairypureorganic.com/contact</loc>
    <lastmod>2026-09-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;

fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
console.log('Updated sitemap.xml');

// 3. Update vercel.json
const vercelPath = path.join(rootDir, 'vercel.json');
const vercelJson = {
  "version": 2,
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/cow-milk-home-delivery-mirpur-12", "destination": "/mirpur-12-milk-delivery.html" },
    { "source": "/cow-milk-home-delivery-pallabi", "destination": "/cow-milk-home-delivery-pallabi.html" },
    { "source": "/pure-cow-milk-mirpur", "destination": "/pure-cow-milk-mirpur.html" },
    { "source": "/admin", "destination": "/admin/index.html" },
    { "source": "/admin/", "destination": "/admin/index.html" },
    { "source": "/api/products", "destination": "/api/products.js" }
  ]
};
fs.writeFileSync(vercelPath, JSON.stringify(vercelJson, null, 2), 'utf8');
console.log('Updated vercel.json');

// 4. Update robots.txt
const robotsPath = path.join(rootDir, 'robots.txt');
const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

# Host & Sitemap
Host: https://www.dairypureorganic.com
Sitemap: https://www.dairypureorganic.com/sitemap.xml
`;
fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
console.log('Updated robots.txt');

console.log('All synchronization complete!');
