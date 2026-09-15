/**
 * Dairy Pure & Organic (DPO) - Location Pages Generator Engine
 * 
 * Compiles reusable location landing pages from data/locations.json
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dataPath = path.join(rootDir, 'data', 'locations.json');

if (!fs.existsSync(dataPath)) {
  console.error('Error: locations.json not found at', dataPath);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const { business, commonServiceAreas, locations } = data;

function renderPage(loc) {
  const waOrderText = encodeURIComponent(`হ্যালো Dairy Pure & Organic, আমি ${loc.nameBn} এলাকায় খাঁটি গরুর দুধ হোম ডেলিভারি নিতে চাই।`);
  const waUrl = `https://wa.me/${business.whatsapp_raw}?text=${waOrderText}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${loc.geo.lat},${loc.geo.lng}&hl=bn&z=15&output=embed`;

  // Build JSON-LD Schema Graph
  const schemaGraph = [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "হোম",
          "item": "https://www.dairypureorganic.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "হোম ডেলিভারি এলাকা",
          "item": "https://www.dairypureorganic.com/#delivery-areas"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${loc.nameBn}-এ গরুর দুধ ডেলিভারি`,
          "item": loc.canonical
        }
      ]
    },
    {
      "@type": "LocalBusiness",
      "name": `Dairy Pure & Organic — ${loc.nameBn} মিল্ক ডেলিভারি`,
      "image": "https://www.dairypureorganic.com/assets/images/milk-1l.jpg",
      "telephone": business.phone1_raw,
      "url": loc.canonical,
      "priceRange": "৳50 - ৳500",
      "paymentAccepted": "Cash on Delivery, bKash, Nagad",
      "currenciesAccepted": "BDT",
      "openingHours": "Mo-Su 00:00-24:00",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": business.address,
        "addressLocality": loc.nameEn,
        "addressRegion": "Dhaka",
        "postalCode": business.postalCode,
        "addressCountry": "BD"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": loc.geo.lat,
        "longitude": loc.geo.lng
      },
      "areaServed": loc.localAreasCovered.map(area => ({
        "@type": "AdministrativeArea",
        "name": area
      }))
    },
    {
      "@type": "Product",
      "name": `খাঁটি কাঁচা তরল গরুর দুধ — ${loc.nameBn} হোম ডেলিভারি`,
      "image": "https://www.dairypureorganic.com/assets/images/milk-1l.jpg",
      "description": `সরাসরি নিজস্ব খামার থেকে সংগ্রহকৃত শতভাগ খাঁটি ও কাঁচা গরুর দুধ। ${loc.nameBn} এলাকায় ফ্রি হোম ডেলিভারি।`,
      "sku": `DPO-MILK-${loc.id.toUpperCase()}`,
      "brand": {
        "@type": "Brand",
        "name": "Dairy Pure & Organic"
      },
      "offers": {
        "@type": "Offer",
        "price": business.pricePerKg.toString(),
        "priceCurrency": "BDT",
        "availability": "https://schema.org/InStock",
        "url": loc.canonical
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": loc.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }
  ];

  const pointersHtml = loc.localIntro.localPointers.map(p => `
    <li><i class="fa-solid fa-circle-check"></i> <span>${p}</span></li>
  `).join('');

  const areasCoveredHtml = loc.localAreasCovered.map(a => `
    <span class="coverage-chip"><i class="fa-solid fa-location-dot"></i> ${a}</span>
  `).join('');

  const allServiceAreasHtml = commonServiceAreas.map(sa => {
    const isCurrent = sa.slug === loc.slug;
    return `
      <a href="${sa.slug}.html" class="service-area-btn ${isCurrent ? 'active' : ''}">
        <span><i class="fa-solid ${isCurrent ? 'fa-circle-check' : 'fa-map-pin'}"></i> ${sa.bn} (${sa.name})</span>
        <i class="fa-solid fa-arrow-right" style="font-size: 11px;"></i>
      </a>
    `;
  }).join('');

  const reviewsHtml = loc.reviews.map(r => `
    <div class="review-card-item">
      <div class="review-card-rating">
        ${'<i class="fa-solid fa-star"></i>'.repeat(r.rating || 5)}
      </div>
      <div class="review-card-text">
        "${r.review_text}"
      </div>
      <div class="review-author-info">
        <div class="review-avatar-placeholder">
          ${r.customer_name.charAt(0)}
        </div>
        <div>
          <div class="author-name">${r.customer_name}</div>
          <div class="author-locality"><i class="fa-solid fa-location-dot" style="color: var(--dpo-green);"></i> ${r.area}</div>
        </div>
      </div>
    </div>
  `).join('');

  const faqsHtml = loc.faqs.map((faq, idx) => `
    <div class="faq-item ${idx === 0 ? 'active' : ''}">
      <button class="faq-question-btn" type="button" aria-expanded="${idx === 0 ? 'true' : 'false'}">
        <span><i class="fa-regular fa-circle-question" style="color: var(--dpo-blue); margin-right: 8px;"></i> ${faq.q}</span>
        <i class="fa-solid fa-chevron-down faq-icon"></i>
      </button>
      <div class="faq-answer-panel">
        <p>${faq.a}</p>
      </div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="bn" prefix="og: https://ogp.me/ns#">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <title>${loc.seoTitle}</title>
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="${loc.seoTitle}">
    <meta name="description" content="${loc.metaDescription}">
    <meta name="keywords" content="${loc.nameBn} খাঁটি গরুর দুধ, ${loc.nameBn} গরুর দুধ হোম ডেলিভারি, ${loc.nameEn} cow milk delivery, ${loc.nameEn} milk home delivery, fresh raw milk ${loc.nameEn} dhaka">
    <meta name="author" content="Dairy Pure & Organic">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="${loc.canonical}">
    <meta name="theme-color" content="#003875">

    <!-- GEO & Local SEO Meta Tags -->
    <meta name="geo.region" content="BD-13">
    <meta name="geo.placename" content="${loc.geo.placename}">
    <meta name="geo.position" content="${loc.geo.lat};${loc.geo.lng}">
    <meta name="ICBM" content="${loc.geo.lat}, ${loc.geo.lng}">
    <meta name="locality" content="${loc.nameEn}">
    <meta name="region" content="Dhaka">
    <meta name="country-name" content="Bangladesh">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${loc.canonical}">
    <meta property="og:site_name" content="Dairy Pure & Organic">
    <meta property="og:title" content="${loc.ogTitle}">
    <meta property="og:description" content="${loc.ogDescription}">
    <meta property="og:image" content="https://www.dairypureorganic.com/assets/images/milk-1l.jpg">
    <meta property="og:image:width" content="800">
    <meta property="og:image:height" content="600">
    <meta property="og:locale" content="bn_BD">

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="${loc.canonical}">
    <meta name="twitter:title" content="${loc.ogTitle}">
    <meta name="twitter:description" content="${loc.ogDescription}">
    <meta name="twitter:image" content="https://www.dairypureorganic.com/assets/images/milk-1l.jpg">

    <!-- Favicon -->
    <link rel="icon" href="assets/images/favicon.png" type="image/png">
    <link rel="apple-touch-icon" href="assets/images/logo.png">

    <!-- JSON-LD Structured Data: LocalBusiness, Breadcrumbs, Product, FAQ -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": ${JSON.stringify(schemaGraph, null, 2)}
    }
    </script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/animations-3d.css">
    <link rel="stylesheet" href="assets/css/location-pages.css">
</head>
<body>

    <!-- Top Announcement Bar -->
    <div class="top-bar">
        <div class="container">
            <div class="top-bar-left">
                <span><i class="fa-solid fa-bullhorn"></i> 🚚 ${loc.nameBn}-এ ২৪/৭ দিন-রাত যেকোনো সময়ে সরাসরি নিজস্ব খামার থেকে খাঁটি দুধ হোম ডেলিভারি!</span>
            </div>
            <div class="top-bar-right">
                <a href="tel:${business.phone1_raw}"><i class="fa-solid fa-phone"></i> ${business.phone1}</a>
                <a href="${waUrl}" target="_blank"><i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপ: ${business.whatsapp}</a>
            </div>
        </div>
    </div>

    <!-- Main Header -->
    <header class="site-header">
        <div class="container">
            <div class="header-wrapper">
                <!-- Brand Logo -->
                <div class="site-branding">
                    <a href="index.html" class="site-logo">
                        <img src="assets/images/logo.png" alt="Dairy Pure & Organic Logo" width="48" height="48">
                        <div class="site-logo-text">
                            Dairy Pure
                            <span>& ORGANIC</span>
                        </div>
                    </a>
                </div>

                <!-- Main Navigation -->
                <nav class="main-navigation" id="site-navigation">
                    <ul class="nav-menu">
                        <li><a href="index.html">হোম (Home)</a></li>
                        <li><a href="shop.html">শপ (Shop)</a></li>
                        <li><a href="membership.html">মেম্বারশিপ (Membership)</a></li>
                        <li><a href="about.html">আমাদের সম্পর্কে (About Us)</a></li>
                        <li><a href="contact.html">যোগাযোগ (Contact Us)</a></li>
                    </ul>
                </nav>

                <!-- Header Actions -->
                <div class="header-actions">
                    <button class="theme-toggle-btn" id="theme-toggle-btn" title="ডার্ক / লাইট মোড পরিবর্তন করুন" aria-label="Toggle Dark Mode">
                        <i class="fa-solid fa-moon"></i>
                    </button>

                    <button class="cart-btn" id="open-cart-btn" title="কার্ট দেখুন" aria-label="View Cart">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span class="cart-badge">0</span>
                    </button>
                    
                    <a href="#order-spotlight" class="btn btn-primary" style="padding: 10px 18px; font-size: 14px;">
                        <i class="fa-solid fa-basket-shopping"></i> অর্ডার করুন
                    </a>

                    <button class="mobile-nav-toggle" id="mobile-nav-toggle" aria-label="Toggle navigation">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- Breadcrumbs -->
    <div class="location-breadcrumbs">
        <div class="container">
            <a href="index.html"><i class="fa-solid fa-house"></i> হোম</a>
            <span>/</span>
            <a href="index.html#delivery-areas">ডেলিভারি এলাকা</a>
            <span>/</span>
            <span class="current">${loc.nameBn} (${loc.nameEn})</span>
        </div>
    </div>

    <!-- 1. Hero Section -->
    <section class="location-hero">
        <div class="container">
            <div class="location-hero-grid">
                <div class="location-hero-content">
                    <div class="location-hero-badge">
                        <i class="fa-solid fa-map-pin"></i> <span>${loc.zoneLabel} কাভারেজ</span>
                    </div>
                    <h1 class="location-hero-title">
                        খাঁটি গরুর দুধ হোম ডেলিভারি — <span class="locality-name">${loc.nameBn}</span>
                    </h1>
                    <p class="location-hero-desc">
                        ${loc.hero.description}
                    </p>

                    <div class="location-hero-highlights">
                        <span class="hero-highlight-pill"><i class="fa-solid fa-truck-fast"></i> ${loc.hero.highlight}</span>
                        <span class="hero-highlight-pill"><i class="fa-solid fa-shield-halved"></i> ১০০% কাঁচা ও প্রাকৃতিক</span>
                        <span class="hero-highlight-pill"><i class="fa-solid fa-tag"></i> মেম্বারশিপে ৳৫ ছাড়/কেজি</span>
                    </div>

                    <div class="location-hero-actions">
                        <a href="#order-spotlight" class="btn btn-primary">
                            <i class="fa-solid fa-cart-shopping"></i> দুধ অর্ডার করুন
                        </a>
                        <a href="${waUrl}" class="btn btn-whatsapp" target="_blank">
                            <i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপে অর্ডার
                        </a>
                        <a href="tel:${business.phone1_raw}" class="btn" style="background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.3);">
                            <i class="fa-solid fa-phone"></i> সরাসরি কল করুন
                        </a>
                    </div>
                </div>

                <div class="location-hero-card">
                    <div class="location-hero-card-header">
                        <div class="hero-card-location-tag">
                            <i class="fa-solid fa-location-dot"></i> <span>${loc.nameBn} জোন</span>
                        </div>
                        <span class="hero-card-status"><i class="fa-solid fa-circle-check"></i> ডেলিভারি চালু আছে</span>
                    </div>

                    <div class="location-hero-visual-art">
                        <img src="assets/images/milk-1l.jpg" alt="${loc.nameBn} খাঁটি গরুর দুধ ১ লিটার বোতল" width="220" height="280">
                    </div>

                    <div class="hero-card-specs">
                        <div class="spec-chip">
                            <span class="spec-lbl">বর্তমান মূল্য:</span>
                            <span class="spec-val">৳ ${business.pricePerKg} / লিটার</span>
                        </div>
                        <div class="spec-chip">
                            <span class="spec-lbl">মেম্বার প্রাইস:</span>
                            <span class="spec-val" style="color: #facc15;">৳ ${business.memberPricePerKg} / লিটার</span>
                        </div>
                    </div>

                    <a href="${waUrl}" class="hero-card-cta-btn" target="_blank">
                        <i class="fa-brands fa-whatsapp" style="color: #25d366; font-size: 18px;"></i> ${loc.nameBn}-এ ইনস্ট্যান্ট ডেলিভারি বুক করুন
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- 2. Local Introduction Section -->
    <section class="local-intro-section">
        <div class="container">
            <div class="local-intro-grid">
                <div class="local-intro-content">
                    <span class="section-tag"><i class="fa-solid fa-leaf"></i> লোকাল ডেলিভারি সার্ভিস</span>
                    <h2>${loc.localIntro.heading}</h2>
                    ${loc.localIntro.paragraphs.map(p => `<p>${p}</p>`).join('')}

                    <ul class="local-intro-pointers">
                        ${pointersHtml}
                    </ul>

                    <div style="margin-top: 25px;">
                        <a href="shop.html" class="btn btn-primary" style="padding: 12px 22px; font-size: 14.5px;">
                            <i class="fa-solid fa-bottle-droplet"></i> সকল প্যাকেজ ও রেট দেখুন
                        </a>
                    </div>
                </div>

                <!-- 4. Local Dynamic Graphic -->
                <div class="local-dynamic-graphic-box">
                    <div class="dynamic-graphic-badge">
                        <i class="fa-solid fa-route"></i> ${loc.graphic.badge}
                    </div>
                    <div class="dynamic-graphic-header">
                        <h3>${loc.graphic.headline}</h3>
                        <p>${loc.graphic.sub}</p>
                    </div>

                    <div class="route-visual-map">
                        <div class="route-step active">
                            <div class="route-step-icon"><i class="fa-solid fa-cow"></i></div>
                            <div class="route-step-info">
                                <h4>১. নিজস্ব ডেইরি ফার্ম</h4>
                                <span>সকাল ও বিকাল তাজা দুধ সংগ্রহ</span>
                            </div>
                        </div>
                        <div class="route-step active">
                            <div class="route-step-icon"><i class="fa-solid fa-temperature-arrow-down"></i></div>
                            <div class="route-step-info">
                                <h4>২. হাইজিন কোল্ড-চেইন</h4>
                                <span>৪°C তাপমাত্রায় বিশুদ্ধতা সিলগালা</span>
                            </div>
                        </div>
                        <div class="route-step active">
                            <div class="route-step-icon"><i class="fa-solid fa-truck-ramp-box"></i></div>
                            <div class="route-step-info">
                                <h4>৩. ${loc.nameBn} এক্সপ্রেস ভ্যান</h4>
                                <span>সরাসরি আপনার ঠিকানায় ফ্রি ডেলিভারি</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 3. Why Choose Dairy Pure & Organic -->
    <section class="why-choose-section">
        <div class="container">
            <div class="section-header-centered">
                <span class="section-tag"><i class="fa-solid fa-medal"></i> আমাদের বিশেষত্ব</span>
                <h2 class="section-heading-main">কেন ${loc.nameBn}-এর পরিবারগুলো DPO বেছে নেয়?</h2>
                <p class="section-subtitle-main">আমরা শুধু দুধ বিক্রি করি না, খামারের শতভাগ বিশুদ্ধতা ও আপনার পরিবারের সুস্থতার অঙ্গীকার বহন করি।</p>
            </div>

            <div class="why-choose-grid">
                <div class="why-card">
                    <div class="why-icon"><i class="fa-solid fa-bottle-droplet"></i></div>
                    <h3 class="why-title">১০০% খাঁটি কাঁচা দুধ</h3>
                    <p class="why-desc">কোনো পানি, প্রিজারভেটিভ বা গুঁড়ো দুধের মিশ্রণ নেই। সরাসরি দোয়ানো প্রাকৃতিক তরল গরুর দুধ।</p>
                </div>

                <div class="why-card">
                    <div class="why-icon"><i class="fa-solid fa-sun"></i></div>
                    <h3 class="why-title">প্রতিদিন তাজা দোয়ানো</h3>
                    <p class="why-desc">সকাল ও বিকাল উভয় সময়ে নিজস্ব ফার্মের গাভী থেকে টাটকা দুধ সংগ্রহ করে দ্রুততম সময়ে সরবরাহ করা হয়।</p>
                </div>

                <div class="why-card">
                    <div class="why-icon"><i class="fa-solid fa-truck-fast"></i></div>
                    <h3 class="why-title">ফ্রি হোম ডেলিভারি</h3>
                    <p class="why-desc">${loc.nameBn} এলাকার যেকোনো রোডে কোনো ডেলিভারি চার্জ ছাড়াই সরাসরি বাসার দরজায় দুধ পৌঁছে দেওয়া হয়।</p>
                </div>

                <div class="why-card">
                    <div class="why-icon"><i class="fa-solid fa-id-card"></i></div>
                    <h3 class="why-title">ফ্রি মেম্বারশিপ সুবিধা</h3>
                    <p class="why-desc">কোনো ফি ছাড়াই আজীবন মেম্বারশিপ কার্ড এবং প্রতি লিটারে ৫ টাকা নিশ্চিত সাশ্রয় উপভোগ করুন।</p>
                </div>

                <div class="why-card">
                    <div class="why-icon"><i class="fa-solid fa-mobile-screen-button"></i></div>
                    <h3 class="why-title">সহজ ও দ্রুত অর্ডার</h3>
                    <p class="why-desc">ওয়েবসাইট, সরাসরি ফোন অথবা হোয়াটসঅ্যাপের মাধ্যমে ১ মিনিটেই দৈনিক বা নিয়মিত দুধের অর্ডার করুন।</p>
                </div>

                <div class="why-card">
                    <div class="why-icon"><i class="fa-solid fa-shield-heart"></i></div>
                    <h3 class="why-title">নিরাপদ ও স্বাস্থ্যসম্মত</h3>
                    <p class="why-desc">ফুড-গ্রেড সিলগালা বোতল ও পরিষ্কার পাত্রে কোল্ড-চেইন বজায় রেখে শিশুদের জন্য নিরাপদ দুধ পৌঁছে দিই।</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. How Delivery Works -->
    <section class="how-it-works-section">
        <div class="container">
            <div class="section-header-centered">
                <span class="section-tag"><i class="fa-solid fa-list-check"></i> ৩টি সহজ ধাপ</span>
                <h2 class="section-heading-main">${loc.nameBn}-এ ডেলিভারি কীভাবে কাজ করে?</h2>
                <p class="section-subtitle-main">ঝামেলামুক্ত উপায়ে প্রতিদিন সকালে বা বিকালে আপনার বাসায় তাজা দুধ পৌঁছে যাবে।</p>
            </div>

            <div class="how-steps-grid">
                <div class="step-card">
                    <div class="step-number">০১</div>
                    <div class="step-icon-wrap"><i class="fa-solid fa-cart-shopping"></i></div>
                    <h3 class="step-title">অর্ডার বা শিডিউল করুন</h3>
                    <p class="step-desc">ওয়েবসাইট বা হোয়াটসঅ্যাপে আপনার নাম, ঠিকানা ও দুধের পরিমাণ জানিয়ে ১ মিনিটে অর্ডার কনফার্ম করুন।</p>
                </div>

                <div class="step-card">
                    <div class="step-number">০২</div>
                    <div class="step-icon-wrap"><i class="fa-solid fa-flask-vial"></i></div>
                    <h3 class="step-title">ফার্মে ফ্রেশ প্রিপারেশন</h3>
                    <p class="step-desc">গাভী দোয়ানোর পর ল্যাব টেস্ট ও স্বাস্থ্যসম্মত সিলগালা ফুড-গ্রেড বোতলে দুধ প্রস্তুত করা হয়।</p>
                </div>

                <div class="step-card">
                    <div class="step-number">০৩</div>
                    <div class="step-icon-wrap"><i class="fa-solid fa-house-chimney-user"></i></div>
                    <h3 class="step-title">বাসার দোরগোড়ায় ডেলিভারি</h3>
                    <p class="step-desc">নির্দিষ্ট সময়ে কোনো ডেলিভারি ফি ছাড়াই আমাদের ডেলিভারি টিম আপনার ফ্ল্যাটের দরজায় দুধ পৌঁছে দেবে।</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 6. Product Information Section (Centralized Price) -->
    <section class="product-spotlight-section" id="order-spotlight">
        <div class="container">
            <div class="section-header-centered">
                <span class="section-tag"><i class="fa-solid fa-bottle-droplet"></i> প্রিমিয়াম প্রোডাক্ট</span>
                <h2 class="section-heading-main">খাঁটি কাঁচা তরল গরুর দুধ — ১ লিটার বোতল</h2>
                <p class="section-subtitle-main">${loc.nameBn} এলাকার জন্য নির্ধারিত সাশ্রয়ী অফিশিয়াল মূল্য তালিকা</p>
            </div>

            <div class="product-spotlight-card">
                <div class="spotlight-image-side product-image-wrap" data-product-id="119" title="সম্পূর্ণ ছবি দেখতে ক্লিক করুন">
                    <span class="product-badge">ফার্ম ফ্রেশ</span>
                    <button class="product-quickview-btn" data-quickview="119" title="সম্পূর্ণ ছবি ও বিস্তারিত দেখুন" aria-label="ফুল ভিউ দেখুন">
                        <i class="fa-solid fa-expand"></i> <span>ফুল ভিউ</span>
                    </button>
                    <img src="assets/images/milk-1l.jpg" alt="${loc.nameBn} খাঁটি গরুর দুধ ১ লিটার" width="400" height="300" loading="lazy">
                </div>

                <div class="spotlight-details-side">
                    <div class="spotlight-badge"><i class="fa-solid fa-shield-halved"></i> ১০০% প্রাকৃতিক ও ভেজালমুক্ত</div>
                    <h3 class="spotlight-title">খাঁটি কাঁচা তরল দুধ (১ লিটার বোতল)</h3>
                    <p class="spotlight-desc">প্রতিদিন সকাল ও বিকালের তাজা দোয়ানো পুষ্টিকর কাঁচা দুধ। কোনো পানি, কেমিক্যাল বা কৃত্রিম পাউডার মেশানো হয় না। শিশুদের মেধা ও পরিবারের হাড়ের সুরক্ষায় শতভাগ খাঁটি।</p>

                    <div class="membership-benefit-callout">
                        <i class="fa-solid fa-tag"></i> <span>মেম্বারশিপ সুবিধা: প্রতি কেজিতে ৫ টাকা নিশ্চিত ছাড় (৳৯৫/কেজি)</span>
                    </div>

                    <div class="spotlight-price-box">
                        <span class="price-main-val">৳ ${business.pricePerKg}</span>
                        <span class="price-unit-lbl">/ ১ লিটার বোতল (ফ্রি হোম ডেলিভারি)</span>
                    </div>

                    <div class="spotlight-actions">
                        <button class="btn btn-primary" data-add-to-cart="119" style="padding: 12px 20px; font-size: 14.5px;">
                            <i class="fa-solid fa-cart-shopping"></i> কার্টে যোগ করুন
                        </button>
                        <a href="${waUrl}" class="btn btn-whatsapp" target="_blank" style="padding: 12px 20px; font-size: 14.5px;">
                            <i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপে অর্ডার
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 7. Customer Reviews Section -->
    <section class="location-reviews-section">
        <div class="container">
            <div class="section-header-centered">
                <span class="section-tag"><i class="fa-solid fa-star"></i> কাস্টমার সন্তুষ্টি</span>
                <h2 class="section-heading-main">${loc.nameBn}-এর সম্মানিত গ্রাহকদের ভালোবাসা</h2>
                <p class="section-subtitle-main">আমাদের নিয়মিত গ্রাহকরা আমাদের খাঁটি দুধ ও সার্ভিসের ব্যাপারে কী বলছেন দেখে নিন।</p>
            </div>

            <div class="reviews-grid">
                ${reviewsHtml}
            </div>
        </div>
    </section>

    <!-- 8. Local Delivery Map Section -->
    <section class="local-map-section">
        <div class="container">
            <div class="section-header-centered">
                <span class="section-tag"><i class="fa-solid fa-map-location-dot"></i> লোকাল ম্যাপ</span>
                <h2 class="section-heading-main">${loc.nameBn} এলাকায় আমাদের হোম ডেলিভারি কাভারেজ</h2>
                <p class="section-subtitle-main">আপনার ঠিকানা এই এলাকার মধ্যে হলে সরাসরি কোনো ডেলিভারি চার্জ ছাড়াই অর্ডার করতে পারেন।</p>
            </div>

            <div class="local-map-container">
                <div class="map-embed-wrapper">
                    <iframe src="${mapEmbedUrl}" title="${loc.nameBn} ডেলিভারি ম্যাপ" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <div class="map-coverage-info">
                    <h3>${loc.nameBn} ডেলিভারি জোন</h3>
                    <p>আমরা ${loc.nameBn} ও আশপাশের সকল আবাসিক রোড, এভিনিউ ও অ্যাপার্টমেন্টে প্রতিদিন ভোর ও বিকেলে দুধ পৌঁছে দিয়ে থাকি।</p>

                    <div class="coverage-chips-list">
                        ${areasCoveredHtml}
                    </div>

                    <div style="margin-top: auto; padding-top: 15px; border-top: 1px solid var(--border-color);">
                        <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 15px;">
                            <i class="fa-solid fa-circle-info" style="color: var(--dpo-blue);"></i> আপনার নির্দিষ্ট ভবন বা গলিতে ডেলিভারি নিশ্চিত করতে এখনই আমাদের সাথে যোগাযোগ করুন।
                        </p>
                        <a href="${waUrl}" class="btn btn-whatsapp" target="_blank" style="width: 100%; padding: 11px; font-size: 14px; justify-content: center;">
                            <i class="fa-brands fa-whatsapp"></i> ম্যাপে আপনার ঠিকানা পাঠান
                        </a>
                    </div>
                </div>
            </div>

            <!-- 9. All Active Delivery Areas Navigation -->
            <div class="all-service-areas-hub">
                <h4><i class="fa-solid fa-truck-ramp-box" style="color: var(--dpo-green);"></i> আমাদের অন্যান্য সক্রিয় ডেলিভারি এলাকাসমূহ:</h4>
                <div class="service-areas-links-grid">
                    ${allServiceAreasHtml}
                </div>
            </div>
        </div>
    </section>

    <!-- 10. Free Home Delivery Promotional Banner -->
    <section class="free-delivery-promo-banner">
        <div class="container">
            <div class="promo-banner-flex">
                <div class="promo-banner-content">
                    <h3><i class="fa-solid fa-truck-fast"></i> আপনার এলাকায় FREE HOME DELIVERY</h3>
                    <p>${loc.nameBn}-এ খাঁটি ও তাজা গরুর দুধ এখন আপনার বাসায় সরাসরি ডেলিভারি দেওয়া হচ্ছে।</p>
                </div>
                <div>
                    <a href="${waUrl}" class="btn" style="background: #ffffff; color: #166534; font-weight: 800; padding: 13px 25px; border-radius: var(--radius-md); box-shadow: 0 4px 15px rgba(0,0,0,0.2);" target="_blank">
                        <i class="fa-brands fa-whatsapp"></i> আজই অর্ডার করুন
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- 11. FAQ Section -->
    <section class="location-faq-section">
        <div class="container">
            <div class="section-header-centered">
                <span class="section-tag"><i class="fa-solid fa-circle-question"></i> সাধারণ প্রশ্নোত্তর</span>
                <h2 class="section-heading-main">${loc.nameBn} মিল্ক ডেলিভারি সম্পর্কে প্রশ্নোত্তর</h2>
                <p class="section-subtitle-main">${loc.nameBn} এলাকায় দুধের অর্ডার ও ডেলিভারি সম্পর্কে গ্রাহকদের সচরাচর জিজ্ঞাসা</p>
            </div>

            <div class="faq-accordion-container">
                ${faqsHtml}
            </div>
        </div>
    </section>

    <!-- 12. Final Call To Action Section -->
    <section class="location-final-cta-section">
        <div class="container">
            <div class="final-cta-box">
                <h2>আপনার পরিবারের জন্য খাঁটি দুধ বেছে নিন</h2>
                <p>${loc.nameBn}-এ Dairy Pure & Organic-এর খাঁটি দুধ হোম ডেলিভারি সার্ভিস ব্যবহার করতে আজই যোগাযোগ করুন। শতভাগ প্রাকৃতিক পুষ্টিতে গড়ে উঠুক সুস্থ আগামী।</p>

                <div class="final-cta-buttons">
                    <a href="tel:${business.phone1_raw}" class="btn" style="background: #ffffff; color: #003875; font-weight: 800; padding: 14px 26px; border-radius: var(--radius-md);">
                        <i class="fa-solid fa-phone"></i> কল করুন: ${business.phone1}
                    </a>
                    <a href="${waUrl}" class="btn btn-whatsapp" style="padding: 14px 26px; font-size: 15px;" target="_blank">
                        <i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপে অর্ডার
                    </a>
                    <a href="shop.html" class="btn" style="background: #f59e0b; color: #0f172a; font-weight: 800; padding: 14px 26px; border-radius: var(--radius-md);">
                        <i class="fa-solid fa-basket-shopping"></i> শপ দেখুন
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <!-- Col 1: Brand Story -->
                <div class="footer-widget">
                    <div style="margin-bottom: 15px;">
                        <img src="assets/images/logo.png" alt="Dairy Pure & Organic Logo" width="60" height="60" style="height: 60px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">
                    </div>
                    <p style="font-size: 14px; line-height: 1.7; margin-bottom: 20px;">
                        <strong>Dairy Pure & Organic (DPO)</strong> — সরাসরি নিজস্ব প্রাকৃতিক খামারের ঘাস খাওয়া দেশি ও উন্নত জাতের গাভী থেকে সংগৃহীত ১০০% ভেজালমুক্ত, তাজা ও পুষ্টিকর দুধ পৌঁছে দিচ্ছি আপনার দোরগোড়ায়।
                    </p>
                    <div style="display: flex; gap: 12px;">
                        <a href="https://www.facebook.com/Dairypureorganic" target="_blank" style="background: rgba(255,255,255,0.1); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff;" title="Facebook Page"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="https://wa.me/${business.whatsapp_raw}" target="_blank" style="background: rgba(255,255,255,0.1); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff;" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
                    </div>
                </div>

                <!-- Col 2: Quick Links -->
                <div class="footer-widget">
                    <h4>প্রয়োজনীয় লিংক</h4>
                    <ul class="footer-links">
                        <li><a href="index.html"><i class="fa-solid fa-angle-right"></i> হোম পেজ</a></li>
                        <li><a href="shop.html"><i class="fa-solid fa-angle-right"></i> আমাদের শপ / পণ্য</a></li>
                        <li><a href="membership.html"><i class="fa-solid fa-angle-right"></i> মেম্বারশিপ কার্ড</a></li>
                        <li><a href="about.html"><i class="fa-solid fa-angle-right"></i> আমাদের সম্পর্কে</a></li>
                        <li><a href="contact.html"><i class="fa-solid fa-angle-right"></i> যোগাযোগ ও অর্ডার</a></li>
                    </ul>
                </div>

                <!-- Col 3: Local Delivery Areas -->
                <div class="footer-widget">
                    <h4>ডেলিভারি এলাকাসমূহ</h4>
                    <ul class="footer-links">
                        <li><a href="mirpur-cow-milk-home-delivery.html"><i class="fa-solid fa-angle-right"></i> মিরপুর দুধ ডেলিভারি</a></li>
                        <li><a href="kazipara-cow-milk-home-delivery.html"><i class="fa-solid fa-angle-right"></i> কাজীপাড়া দুধ ডেলিভারি</a></li>
                        <li><a href="shewrapara-cow-milk-home-delivery.html"><i class="fa-solid fa-angle-right"></i> শেওড়াপাড়া দুধ ডেলিভারি</a></li>
                        <li><a href="kallyanpur-cow-milk-home-delivery.html"><i class="fa-solid fa-angle-right"></i> কল্যাণপুর দুধ ডেলিভারি</a></li>
                        <li><a href="rupnagar-cow-milk-home-delivery.html"><i class="fa-solid fa-angle-right"></i> রূপনগর দুধ ডেলিভারি</a></li>
                        <li><a href="eastern-housing-cow-milk-home-delivery.html"><i class="fa-solid fa-angle-right"></i> ইস্টার্ন হাউজিং ডেলিভারি</a></li>
                        <li><a href="swapnonagar-cow-milk-home-delivery.html"><i class="fa-solid fa-angle-right"></i> স্বপ্ননগর দুধ ডেলিভারি</a></li>
                    </ul>
                </div>

                <!-- Col 4: Contact & Delivery -->
                <div class="footer-widget">
                    <h4>যোগাযোগ ও ঠিকানা</h4>
                    <div style="font-size: 14px; display: flex; flex-direction: column; gap: 10px;">
                        <div><i class="fa-solid fa-location-dot" style="color: var(--dpo-sun); margin-right: 8px;"></i> ${business.address}</div>
                        <div><i class="fa-solid fa-phone" style="color: var(--dpo-green); margin-right: 8px;"></i> <a href="tel:${business.phone1_raw}">${business.phone1}</a></div>
                        <div><i class="fa-solid fa-phone" style="color: var(--dpo-green); margin-right: 8px;"></i> <a href="tel:${business.phone2_raw}">${business.phone2}</a></div>
                        <div><i class="fa-brands fa-whatsapp" style="color: #25d366; margin-right: 8px;"></i> <a href="https://wa.me/${business.whatsapp_raw}" target="_blank">${business.whatsapp}</a></div>
                        <div><i class="fa-solid fa-clock" style="color: var(--dpo-sun); margin-right: 8px;"></i> ডেলিভারি: ${business.deliveryTime}</div>
                    </div>
                </div>
            </div>

            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <div>
                    &copy; 2026 <strong>Dairy Pure & Organic</strong>. সর্বস্বত্ব সংরক্ষিত।
                </div>
                <div class="payment-methods">
                    <span style="font-size: 13px; color: #94a3b8; margin-right: 5px;">পেমেন্ট মেথড:</span>
                    <span class="payment-badge" style="background: #e2136e; color: #fff;">bKash</span>
                    <span class="payment-badge" style="background: #f7931e; color: #fff;">Nagad</span>
                    <span class="payment-badge" style="background: #8c3494; color: #fff;">Rocket</span>
                    <span class="payment-badge" style="background: #0056b3; color: #fff;">Cash On Delivery</span>
                </div>
            </div>
        </div>
    </footer>

    <!-- Floating WhatsApp Action -->
    <a href="${waUrl}" target="_blank" class="floating-whatsapp" title="${loc.nameBn}-এ হোয়াটসঅ্যাপে অর্ডার করুন" aria-label="Chat on WhatsApp">
        <i class="fa-brands fa-whatsapp"></i>
    </a>

    <!-- Cart Drawer Backdrop -->
    <div class="cart-drawer-backdrop" id="cart-drawer-backdrop"></div>

    <!-- Slide-out Cart Drawer -->
    <div class="cart-drawer" id="cart-drawer">
        <div class="cart-drawer-header">
            <h3><i class="fa-solid fa-cart-shopping" style="color: var(--dpo-blue);"></i> আপনার শপিং ব্যাগ</h3>
            <button class="cart-close-btn" id="cart-close-btn" aria-label="Close cart">&times;</button>
        </div>
        <div class="cart-drawer-body" id="cart-drawer-items"></div>
        <div class="cart-drawer-footer" id="cart-drawer-footer">
            <div class="cart-subtotal-row">
                <span>সর্বমোট:</span>
                <span id="cart-drawer-subtotal" style="color: var(--dpo-blue); font-size: 20px;">৳ 0</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <a href="checkout.html" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 15px;">
                    <i class="fa-solid fa-credit-card"></i> চেকআউট করুন
                </a>
                <button class="btn btn-whatsapp" id="cart-whatsapp-order" style="width: 100%; padding: 12px; font-size: 15px;">
                    <i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপে সরাসরি অর্ডার
                </button>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="assets/js/main.js"></script>
    <script src="assets/js/animations-3d.js"></script>
    <script src="assets/js/location-page.js"></script>
</body>
</html>
`;
}

function buildAll() {
  console.log(`Starting generation for ${locations.length} local landing pages...`);
  
  locations.forEach(loc => {
    const html = renderPage(loc);
    const fileName = `${loc.slug}.html`;
    const filePath = path.join(rootDir, fileName);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Generated ${fileName}`);

    // Also support directory clean URL /slug/index.html
    const dirPath = path.join(rootDir, loc.slug);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(path.join(dirPath, 'index.html'), html, 'utf8');
    console.log(`✓ Generated /${loc.slug}/index.html`);
  });

  console.log('All 7 location pages successfully compiled!');
}

buildAll();
