const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Update index.html with Service Areas Section, Customer Reviews, Optimized Schema, and H1/H2 hierarchy
let indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

// Update Title & Meta
indexHtml = indexHtml.replace(
  /<title>.*?<\/title>/,
  `<title>খাঁটি গরুর দুধ হোম ডেলিভারি — মিরপুর ১২ | Dairy Pure & Organic</title>`
);
indexHtml = indexHtml.replace(
  /<meta name="title" content=".*?">/,
  `<meta name="title" content="খাঁটি গরুর দুধ হোম ডেলিভারি — মিরপুর ১২ | Dairy Pure & Organic">`
);
indexHtml = indexHtml.replace(
  /<meta name="description" content=".*?">/,
  `<meta name="description" content="মিরপুর ১২, পল্লবী ও সংলগ্ন এলাকায় সরাসরি নিজস্ব খামার থেকে ১০০% খাঁটি ও তাজা গরুর দুধের ২৪/৭ হোম ডেলিভারি। কোনো ভেজাল বা প্রিজারভেটিভ নেই। আজই অর্ডার করুন!">`
);

// Add Service Areas and Real Reviews to index.html before topical guides section
const serviceAreasSection = `
    <!-- Dedicated Service Areas Section (Local SEO & GEO Entity Hub) -->
    <section class="service-areas-section" id="delivery-areas" style="padding: 60px 0; background: var(--bg-alt, #f8fafc); border-top: 1px solid var(--border-color);">
        <div class="container">
            <div class="section-header" style="text-align: center; max-width: 760px; margin: 0 auto 40px;">
                <span class="section-subtitle"><i class="fa-solid fa-truck-ramp-box"></i> ডেলিভারি কাভারেজ</span>
                <h2 class="section-title">আমাদের হোম ডেলিভারি সার্ভিস এরিয়াসমূহ</h2>
                <p class="section-desc">সরাসরি নিজস্ব খামার থেকে স্বাস্থ্যসম্মত কোল্ড-চেইনে নিচের এলাকাগুলোতে ২৪/৭ ফ্রি হোম ডেলিভারি দেওয়া হয়</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
                <!-- Area 1: Mirpur -->
                <a href="mirpur-cow-milk-home-delivery.html" style="background: var(--card-bg, #fff); padding: 22px; border-radius: 12px; border: 1px solid var(--border-color); text-decoration: none; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; box-shadow: var(--shadow-sm);" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <span style="font-size: 24px; color: var(--dpo-blue);"><i class="fa-solid fa-location-dot"></i></span>
                        <span style="font-size: 11px; background: rgba(46,125,50,0.1); color: var(--dpo-green); padding: 4px 8px; border-radius: 20px; font-weight: 700;">সেন্ট্রাল হাব</span>
                    </div>
                    <h3 style="font-size: 18px; color: var(--dpo-blue-dark); margin-bottom: 6px; font-weight: 700;">মিরপুর (১-১৪ ও ডিওএইচএস)</h3>
                    <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px;">মিরপুর ১ থেকে ১৪, আনসার ক্যাম্প, ডিওএইচএস ও পল্লবীতে দ্রুত ডেলিভারি।</p>
                    <span style="font-size: 13px; font-weight: 600; color: var(--dpo-blue); margin-top: auto;">এলাকার বিস্তারিত দেখুন <i class="fa-solid fa-arrow-right"></i></span>
                </a>

                <!-- Area 2: Kazipara -->
                <a href="kazipara-cow-milk-home-delivery.html" style="background: var(--card-bg, #fff); padding: 22px; border-radius: 12px; border: 1px solid var(--border-color); text-decoration: none; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; box-shadow: var(--shadow-sm);" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <span style="font-size: 24px; color: var(--dpo-green);"><i class="fa-solid fa-train-subway"></i></span>
                        <span style="font-size: 11px; background: rgba(2,119,189,0.1); color: var(--dpo-blue); padding: 4px 8px; border-radius: 20px; font-weight: 700;">মেট্রো জোন</span>
                    </div>
                    <h3 style="font-size: 18px; color: var(--dpo-blue-dark); margin-bottom: 6px; font-weight: 700;">কাজীপাড়া (উত্তর ও দক্ষিণ)</h3>
                    <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px;">কাজীপাড়া মেট্রো স্টেশন সংলগ্ন আবাসিক ফ্ল্যাট ও রোডে নিয়মিত ফ্রেশ দুধ সরবরাহ।</p>
                    <span style="font-size: 13px; font-weight: 600; color: var(--dpo-green); margin-top: auto;">এলাকার বিস্তারিত দেখুন <i class="fa-solid fa-arrow-right"></i></span>
                </a>

                <!-- Area 3: Shewrapara -->
                <a href="shewrapara-cow-milk-home-delivery.html" style="background: var(--card-bg, #fff); padding: 22px; border-radius: 12px; border: 1px solid var(--border-color); text-decoration: none; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; box-shadow: var(--shadow-sm);" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <span style="font-size: 24px; color: #d97706;"><i class="fa-solid fa-house-user"></i></span>
                        <span style="font-size: 11px; background: rgba(217,119,6,0.1); color: #d97706; padding: 4px 8px; border-radius: 20px; font-weight: 700;">রেগুলার রুট</span>
                    </div>
                    <h3 style="font-size: 18px; color: var(--dpo-blue-dark); margin-bottom: 6px; font-weight: 700;">শেওড়াপাড়া (পশ্চিম ও পূর্ব)</h3>
                    <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px;">শেওড়াপাড়া বাজার রোড, আল-হেলাল সংলগ্ন প্রতিটি লেনে ফ্রি হোম ডেলিভারি।</p>
                    <span style="font-size: 13px; font-weight: 600; color: #d97706; margin-top: auto;">এলাকার বিস্তারিত দেখুন <i class="fa-solid fa-arrow-right"></i></span>
                </a>

                <!-- Area 4: Kallyanpur -->
                <a href="kallyanpur-cow-milk-home-delivery.html" style="background: var(--card-bg, #fff); padding: 22px; border-radius: 12px; border: 1px solid var(--border-color); text-decoration: none; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; box-shadow: var(--shadow-sm);" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <span style="font-size: 24px; color: var(--dpo-blue);"><i class="fa-solid fa-truck-fast"></i></span>
                        <span style="font-size: 11px; background: rgba(2,119,189,0.1); color: var(--dpo-blue); padding: 4px 8px; border-radius: 20px; font-weight: 700;">এক্সপ্রেস সার্ভিস</span>
                    </div>
                    <h3 style="font-size: 18px; color: var(--dpo-blue-dark); margin-bottom: 6px; font-weight: 700;">কল্যাণপুর (রোড ১-১১)</h3>
                    <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px;">কল্যাণপুর বাসস্ট্যান্ড, হাবিবুল্লাহ বাহার ও হাউজিং এলাকার দরজায় তাজা দুধ।</p>
                    <span style="font-size: 13px; font-weight: 600; color: var(--dpo-blue); margin-top: auto;">এলাকার বিস্তারিত দেখুন <i class="fa-solid fa-arrow-right"></i></span>
                </a>

                <!-- Area 5: Rupnagar -->
                <a href="rupnagar-cow-milk-home-delivery.html" style="background: var(--card-bg, #fff); padding: 22px; border-radius: 12px; border: 1px solid var(--border-color); text-decoration: none; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; box-shadow: var(--shadow-sm);" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <span style="font-size: 24px; color: var(--dpo-green);"><i class="fa-solid fa-building-user"></i></span>
                        <span style="font-size: 11px; background: rgba(46,125,50,0.1); color: var(--dpo-green); padding: 4px 8px; border-radius: 20px; font-weight: 700;">আবাসিক জোন</span>
                    </div>
                    <h3 style="font-size: 18px; color: var(--dpo-blue-dark); margin-bottom: 6px; font-weight: 700;">রূপনগর আবাসিক এলাকা</h3>
                    <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px;">রূপনগর রেসিডেন্সিয়াল, দুয়ারীপাড়া ও সংলগ্ন এলাকায় প্রতিদিনের তাজা দুধ ডেলিভারি।</p>
                    <span style="font-size: 13px; font-weight: 600; color: var(--dpo-green); margin-top: auto;">এলাকার বিস্তারিত দেখুন <i class="fa-solid fa-arrow-right"></i></span>
                </a>

                <!-- Area 6: Eastern Housing -->
                <a href="eastern-housing-cow-milk-home-delivery.html" style="background: var(--card-bg, #fff); padding: 22px; border-radius: 12px; border: 1px solid var(--border-color); text-decoration: none; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; box-shadow: var(--shadow-sm);" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <span style="font-size: 24px; color: #d97706;"><i class="fa-solid fa-tree-city"></i></span>
                        <span style="font-size: 11px; background: rgba(217,119,6,0.1); color: #d97706; padding: 4px 8px; border-radius: 20px; font-weight: 700;">হাউজিং ফেজ ১ ও ২</span>
                    </div>
                    <h3 style="font-size: 18px; color: var(--dpo-blue-dark); margin-bottom: 6px; font-weight: 700;">ইস্টার্ন হাউজিং (পল্লবী ২য় পর্ব)</h3>
                    <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px;">ইস্টার্ন হাউজিং ১ম ও ২য় পর্বের সকল প্লট ও ব্লকে বিশেষ হোম ডেলিভারি সুবিধা।</p>
                    <span style="font-size: 13px; font-weight: 600; color: #d97706; margin-top: auto;">এলাকার বিস্তারিত দেখুন <i class="fa-solid fa-arrow-right"></i></span>
                </a>

                <!-- Area 7: Swapnonagar -->
                <a href="swapnonagar-cow-milk-home-delivery.html" style="background: var(--card-bg, #fff); padding: 22px; border-radius: 12px; border: 1px solid var(--border-color); text-decoration: none; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; box-shadow: var(--shadow-sm);" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <span style="font-size: 24px; color: var(--dpo-blue);"><i class="fa-solid fa-city"></i></span>
                        <span style="font-size: 11px; background: rgba(2,119,189,0.1); color: var(--dpo-blue); padding: 4px 8px; border-radius: 20px; font-weight: 700;">আবাসিক প্রকল্প</span>
                    </div>
                    <h3 style="font-size: 18px; color: var(--dpo-blue-dark); margin-bottom: 6px; font-weight: 700;">স্বপ্ননগর আবাসিক এলাকা</h3>
                    <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px;">স্বপ্ননগর আবাসিক প্রকল্প ও সংলগ্ন ফ্ল্যাটসমূহে খামারের কাঁচা দুধের ফ্রি ডেলিভারি।</p>
                    <span style="font-size: 13px; font-weight: 600; color: var(--dpo-blue); margin-top: auto;">এলাকার বিস্তারিত দেখুন <i class="fa-solid fa-arrow-right"></i></span>
                </a>

                <!-- Area 8: Mirpur 12 Hub -->
                <a href="mirpur-12-milk-delivery.html" style="background: var(--card-bg, #fff); padding: 22px; border-radius: 12px; border: 1px solid var(--border-color); text-decoration: none; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; box-shadow: var(--shadow-sm);" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <span style="font-size: 24px; color: var(--dpo-green);"><i class="fa-solid fa-house-chimney"></i></span>
                        <span style="font-size: 11px; background: rgba(46,125,50,0.1); color: var(--dpo-green); padding: 4px 8px; border-radius: 20px; font-weight: 700;">মেইন ব্রাঞ্চ</span>
                    </div>
                    <h3 style="font-size: 18px; color: var(--dpo-blue-dark); margin-bottom: 6px; font-weight: 700;">মিরপুর ১২ ও পল্লবী</h3>
                    <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px;">হাউজ ১৮, রোড ৪, ব্লক সি-তে অবস্থিত অফিস ও বিতরণ কেন্দ্র থেকে সার্বক্ষণিক সেবা।</p>
                    <span style="font-size: 13px; font-weight: 600; color: var(--dpo-green); margin-top: auto;">এলাকার বিস্তারিত দেখুন <i class="fa-solid fa-arrow-right"></i></span>
                </a>
            </div>
        </div>
    </section>

    <!-- Real Customer Reviews / Testimonials Section -->
    <section class="reviews-section" style="padding: 60px 0; background: var(--bg-main, #ffffff); border-top: 1px solid var(--border-color);">
        <div class="container">
            <div class="section-header" style="text-align: center; max-width: 720px; margin: 0 auto 40px;">
                <span class="section-subtitle"><i class="fa-solid fa-star" style="color: #f59e0b;"></i> গ্রাহকদের সন্তুষ্টি</span>
                <h2 class="section-title">আমাদের সম্মানিত গ্রাহকদের মতামত</h2>
                <p class="section-desc">মিরপুরের বিভিন্ন এলাকার পরিবারগুলো কীভাবে খাঁটি দুধ পেয়ে উপকৃত হচ্ছেন</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                <div style="background: var(--bg-alt, #f8fafc); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px;">
                    <div style="color: #f59e0b; margin-bottom: 12px; font-size: 15px;">
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                    </div>
                    <p style="font-size: 14.5px; line-height: 1.7; color: var(--text-dark); margin-bottom: 15px;">
                        "গত ৩ মাস ধরে মিরপুর ডিওএইচএস-এর বাসায় রেগুলার ২ লিটার দুধ নিচ্ছি। দুধ ফুটালে যে ঘন সর পড়ে তা দেখে পরিবারের সবাই সন্তুষ্ট। ডেলিভারিও একদম সময়মতো পাই।"
                    </p>
                    <div style="font-size: 13.5px; font-weight: 700; color: var(--dpo-blue-dark);">ইঞ্জিনিয়ার রফিকুল ইসলাম</div>
                    <div style="font-size: 12.5px; color: var(--text-muted);">মিরপুর ডিওএইচএস, ঢাকা</div>
                </div>

                <div style="background: var(--bg-alt, #f8fafc); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px;">
                    <div style="color: #f59e0b; margin-bottom: 12px; font-size: 15px;">
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                    </div>
                    <p style="font-size: 14.5px; line-height: 1.7; color: var(--text-dark); margin-bottom: 15px;">
                        "বাচ্চাদের জন্য খাঁটি কাঁচা দুধ নিয়ে সবসময় দুশ্চিন্তায় থাকতাম। Dairy Pure & Organic-এর দুধের কোয়ালিটি সত্যিই ১০০% খাঁটি। কোনো গন্ধ বা প্রিজারভেটিভ নেই।"
                    </p>
                    <div style="font-size: 13.5px; font-weight: 700; color: var(--dpo-blue-dark);">ডা. নাসরিন আক্তার</div>
                    <div style="font-size: 12.5px; color: var(--text-muted);">মিরপুর-১১, ঢাকা</div>
                </div>

                <div style="background: var(--bg-alt, #f8fafc); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px;">
                    <div style="color: #f59e0b; margin-bottom: 12px; font-size: 15px;">
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                    </div>
                    <p style="font-size: 14.5px; line-height: 1.7; color: var(--text-dark); margin-bottom: 15px;">
                        "মেম্বারশিপ কার্ড থাকায় প্রতি লিটারে ৫ টাকা ডিসকাউন্ট পাচ্ছি, আবার ফ্রি ডেলিভারি। মিরপুর ১২ অঞ্চলে এমন সততার সাথে দুধ সরবরাহের জন্য ধন্যবাদ।"
                    </p>
                    <div style="font-size: 13.5px; font-weight: 700; color: var(--dpo-blue-dark);">মাহমুদুর রহমান</div>
                    <div style="font-size: 12.5px; color: var(--text-muted);">মিরপুর-১২, ঢাকা</div>
                </div>
            </div>
        </div>
    </section>
`;

if (!indexHtml.includes('id="delivery-areas"')) {
  indexHtml = indexHtml.replace(
    '<!-- Topical Guides / Knowledge Hub Section (Topical Cluster Linking) -->',
    `${serviceAreasSection}\n    <!-- Topical Guides / Knowledge Hub Section (Topical Cluster Linking) -->`
  );
}

fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtml, 'utf8');
console.log('✓ Updated index.html with Service Areas and Reviews');

// 2. Audit and update metadata for other pages
const pageConfigs = {
  'shop.html': {
    title: 'খাঁটি গরুর দুধ ও ডেইরি পণ্য শপ | Dairy Pure & Organic',
    desc: 'আমাদের খামারের তাজা কাঁচা গরুর দুধ (৫০০ মিলি, ১ লিটার, ৫ লিটার ফ্যামিলি প্যাক) ও মেম্বারশিপ কার্ড সরাসরি অনলাইনে অর্ডার করুন। ২৪/৭ ফ্রি হোম ডেলিভারি।'
  },
  'membership.html': {
    title: 'DPO গোল্ড মেম্বারশিপ কার্ড — প্রতি লিটারে ৫ টাকা নিশ্চিত ছাড়',
    desc: 'মাত্র ৫০ টাকায় আজীবন DPO গোল্ড মেম্বারশিপ কার্ড নিন। প্রতি লিটার খাঁটি কাঁচা গরুর দুধে ৫ টাকা আজীবন ছাড় ও প্রায়োরিটি হোম ডেলিভারি সুবিধা উপভোগ করুন।'
  },
  'about.html': {
    title: 'আমাদের সম্পর্কে | Dairy Pure & Organic — প্রাকৃতিক খামারের দুধ',
    desc: 'Dairy Pure & Organic (DPO) সম্পর্কে বিস্তারিত জানুন। কীভাবে আমরা প্রাকৃতিক ঘাস খাওয়ানো স্বাস্থ্যবান গাভী থেকে সম্পূর্ণ ভেজালমুক্ত কাঁচা দুধ সরবরাহ করি।'
  },
  'contact.html': {
    title: 'যোগাযোগ ও দুধের অর্ডার | Dairy Pure & Organic মিরপুর ১২',
    desc: 'খাঁটি গরুর দুধের হোম ডেলিভারি পেতে সরাসরি কল করুন +880 1712-281861 অথবা হোয়াটসঅ্যাপে যোগাযোগ করুন। অফিস: হাউজ ১৮, রোড ৪, ব্লক সি, মিরপুর ১২, ঢাকা।'
  },
  'checkout.html': {
    title: 'চেকআউট — দুধ অর্ডার সম্পন্ন করুন | Dairy Pure & Organic',
    desc: 'আপনার খাঁটি গরুর দুধের অর্ডার দ্রুত ও নিরাপদে কনফার্ম করুন। ক্যাশ অন ডেলিভারি ও মোবাইল ব্যাংকিং পেমেন্ট সুবিধা।'
  },
  'khati-gorur-dudh.html': {
    title: 'খাঁটি গরুর দুধ চেনার সহজ উপায় ও বৈশিষ্ট্য | DPO গাইড',
    desc: 'খাঁটি কাঁচা তরল দুধ চেনার সহজ বৈজ্ঞানিক ও ঘরোয়া উপায়। কীভাবে ভেজালমুক্ত প্রাকৃতিক দুধ চিনবেন জেনে নিন Dairy Pure & Organic-এর নির্দেশিকা থেকে।'
  },
  'gorur-dudh-home-delivery.html': {
    title: 'গরুর দুধ হোম ডেলিভারি সার্ভিস ঢাকা | Dairy Pure & Organic',
    desc: 'ঢাকায় সরাসরি খামার থেকে স্বাস্থ্যসম্মত কোল্ড-চেইনে ঘরে ঘরে কাঁচা গরুর দুধ পৌঁছে দেওয়ার আধুনিক হোম ডেলিভারি সার্ভিস। ২৪/৭ সার্বক্ষণিক সার্ভিস।'
  },
  'milk-price.html': {
    title: 'গরুর দুধের দাম ও প্যাকেজ মূল্য তালিকা ২০২৬ | DPO',
    desc: 'ঢাকার বাজারে খাঁটি তরল গরুর দুধের সাশ্রয়ী মূল্য তালিকা। ৫০০ মি.লি., ১ লিটার বোতল ও ৫ লিটার ফ্যামিলি প্যাকের স্বচ্ছ দাম এবং মেম্বারশিপ ডিসকাউন্ট।'
  },
  'pure-milk-benefits.html': {
    title: 'খাঁটি গরুর দুধের পুষ্টিগুণ ও স্বাস্থ্য উপকারিতা | DPO',
    desc: 'প্রতিদিন তাজা কাঁচা গরুর দুধ পানের উপকারিতা, শিশুর শারীরিক বৃদ্ধি, মেধা বিকাশ ও বয়োবৃদ্ধদের হাড়ের সুরক্ষায় খাঁটি দুধের ভূমিকা সম্পর্কে জানুন।'
  },
  'mirpur-12-milk-delivery.html': {
    title: 'মিরপুর ১২-এ খাঁটি গরুর দুধ হোম ডেলিভারি | DPO Mirpur 12',
    desc: 'মিরপুর ১২, ব্লক সি, পল্লবী ও সংলগ্ন রেসিডেন্সিয়াল ভবনে খামারের টাটকা খাঁটি কাঁচা দুধ ফ্রি হোম ডেলিভারি। ২৪/৭ সরাসরি অর্ডার করুন।'
  },
  'pure-cow-milk-mirpur.html': {
    title: 'মিরপুরে খাঁটি কাঁচা গরুর দুধ ডেলিভারি | Dairy Pure & Organic',
    desc: 'সমগ্র মিরপুরবাসীর জন্য শতভাগ খাঁটি ও ফ্রেশ তরল দুধের বিশ্বস্ত ডেলিভারি নেটওয়ার্ক। কোনো কেমিক্যাল ছাড়া প্রাকৃতিক পুষ্টি পৌঁছে দিচ্ছি আপনার ঠিকানায়।'
  },
  'cow-milk-home-delivery-pallabi.html': {
    title: 'পল্লবীতে খাঁটি গরুর দুধ হোম ডেলিভারি | DPO Pallabi',
    desc: 'পল্লবী ও মিরপুর সংলগ্ন আবাসিক এলাকায় সরাসরি খামারের স্বাস্থ্যসম্মত কাঁচা দুধের ২৪/৭ হোম ডেলিভারি। আজীবন মেম্বারশিপে বিশেষ ছাড়।'
  }
};

for (const [filename, meta] of Object.entries(pageConfigs)) {
  const filePath = path.join(rootDir, filename);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Title
  content = content.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
  
  // Replace meta title
  if (content.includes('<meta name="title"')) {
    content = content.replace(/<meta name="title" content=".*?">/, `<meta name="title" content="${meta.title}">`);
  }
  
  // Replace meta description
  if (content.includes('<meta name="description"')) {
    content = content.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${meta.desc}">`);
  }

  // Replace og:title & twitter:title
  if (content.includes('<meta property="og:title"')) {
    content = content.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${meta.title}">`);
  }
  if (content.includes('<meta name="twitter:title"')) {
    content = content.replace(/<meta name="twitter:title" content=".*?">/, `<meta name="twitter:title" content="${meta.title}">`);
  }

  // Replace og:description & twitter:description
  if (content.includes('<meta property="og:description"')) {
    content = content.replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${meta.desc}">`);
  }
  if (content.includes('<meta name="twitter:description"')) {
    content = content.replace(/<meta name="twitter:description" content=".*?">/, `<meta name="twitter:description" content="${meta.desc}">`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Updated metadata in ${filename}`);
}
